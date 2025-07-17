import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subscription } from 'rxjs';
import * as topojson from 'topojson-client';
import { environment } from '../../../../environments/environment.staging';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.css']
})
export class CoverageComponent implements AfterViewInit, OnDestroy {
  private socket$: WebSocketSubject<any>;
  private subscription: Subscription;
  private svg;
  private projection;
  private path;
  tooltip: any;

  private attackMapResponseArray: any[] = [];
  private subscriptionData: any[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.createMap();
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.socket$) this.socket$.complete();

    this.attackMapResponseArray = [];
    this.subscriptionData = [];
  }

  createMap(): void {
    const width = 1600;
    const height = 800;

    this.svg = d3.select('#map').append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .style('background', '#001f33');

    this.projection = d3.geoMercator().fitSize([width, height], { type: "Sphere" });
    this.path = d3.geoPath().projection(this.projection);

    d3.json('https://unpkg.com/world-atlas@2/countries-110m.json').then((world: any) => {
      const countries: any = topojson.feature(world, world.objects.countries);

      this.svg.append('g')
        .selectAll('path')
        .data(countries.features)
        .enter().append('path')
        .attr('fill', '#1c1c1c')
        .attr('stroke', '#ccc')
        .attr('d', this.path)
        .on('mouseover', (event, d) => {
          d3.select(event.currentTarget).attr('fill', 'gray');
          this.tooltip.style('display', 'block')
            .html(`<strong>Country:</strong> ${d.properties.name || 'Unknown'}`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mousemove', (event) => {
          this.tooltip
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', (event) => {
          d3.select(event.currentTarget).attr('fill', '#1c1c1c');
          this.tooltip.style('display', 'none');
        });
    });

    this.tooltip = d3.select('#tooltip');
  }

  connectWebSocket(): void {
    this.socket$ = webSocket(environment.webSocketUrl);

    this.subscription = this.socket$.subscribe(
      event => {
        if (event !== '"CONNECT_ACK"') {
          this.saveSession(event);
          this.attackMapResponseArray.push(event);
          this.trimAttackBuffer();
          this.handleSubscriptionData(event);
          this.updateMap(event);
        }
      },
      err => console.error('WebSocket error:', err),
      () => console.warn('WebSocket connection closed')
    );
  }

  updateMap(event): void {
    if (!event?.source?.origin?.geolocation) return;

    const source = event.source.origin.geolocation;
    const destination = event.source.destination;
    const category = event.source.category;

    if (source.country_name) {
      this.blinkCountry(source.country_name, this.setArcColor(category), 500, 6);
    }

    const [xSource, ySource] = this.projection([source.longitude, source.latitude]);

    const pulse = this.svg.append('circle')
      .attr('cx', xSource)
      .attr('cy', ySource)
      .attr('r', 0)
      .attr('fill', this.setArcColor(category))
      .attr('opacity', 0.7)
      .on('mouseover', (event) => {
        this.tooltip.style('display', 'block')
          .html(`
            <strong>Country:</strong> ${source.country_name || 'Unknown'}<br>
            <strong>IP:</strong> ${source.ip || 'N/A'}<br>
            <strong>Attack Type:</strong> ${category || 'Unknown'}
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => this.tooltip.style('display', 'none'));

    pulse.transition()
      .duration(1000)
      .attr('r', 15)
      .transition()
      .duration(1000)
      .attr('r', 0)
      .remove();

    if (destination) {
      const [xDest, yDest] = this.projection([destination.longitude, destination.latitude]);

      const line = this.svg.append('path')
        .datum({ type: "LineString", coordinates: [[source.longitude, source.latitude], [destination.longitude, destination.latitude]] })
        .attr('fill', 'none')
        .attr('stroke', this.setArcColor(category))
        .attr('stroke-width', 2)
        .attr('opacity', 0.8)
        .attr('d', this.path);

      const totalLength = line.node().getTotalLength();

      line
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .transition()
        .duration(2000)
        .style('opacity', 0)
        .remove();
    }
  }

  blinkCountry(countryName: string, blinkColor: string = 'red', interval: number = 500, count: number = 5) {
    const countryPath = this.svg.selectAll('path')
      .filter((d) => d.properties && d.properties.name === countryName);

    if (!countryPath.empty()) {
      let originalColor = countryPath.attr('fill');
      let i = 0;

      const blinker = () => {
        if (i >= count * 2) {
          countryPath.attr('fill', originalColor);
          return;
        }

        countryPath.transition()
          .duration(interval / 2)
          .attr('fill', (i % 2 === 0) ? blinkColor : originalColor)
          .on('end', () => {
            i++;
            blinker();
          });
      };

      blinker();
    }
  }

  setArcColor(severity: string): string {
    return {
      SshIncident: '#975a84',
      dbAttack: '#a5a0a3',
      SmbIncident: '#fc5118',
      HttpIncident: '#fc17ad',
      FtpIncident: '#8b41f5',
      MssqlIncident: '#4afcbf',
      MysqlIncident: '#bcfc21',
      MongoIncident: '#d050fc',
      ProbingIncident: '#fcd615',
      SipIncident: '#1dfc10',
      MalwareIncident: '#fc270c',
      WebIncident: '#0a16fc',
      NetworkIncident: '#0a16fc',
    }[severity.charAt(0).toUpperCase() + severity.slice(1)] || 'red';
  }

  trimAttackBuffer(): void {
    if (this.attackMapResponseArray.length > 100) {
      this.attackMapResponseArray.splice(0, this.attackMapResponseArray.length - 100);
    }
  }

  handleSubscriptionData(data): void {
    if (data.subscribe) {
      const sub = {
        ip: data.origin.ip,
        attackType: data.source.category,
        date: data.data?.dateTime || data.date,
        priority: data.source.severityScore,
        country: data.source.origin.geolocation.country_name
      };
      this.subscriptionData.push(sub);
      if (this.subscriptionData.length > 10) {
        this.subscriptionData.splice(0, this.subscriptionData.length - 10);
      }
    }
  }

  saveSession(event): void {
    const sessionId = event?.headers?.['message-id'];
    if (sessionId) {
      localStorage.setItem('message-id', sessionId);
    }
  }
}
