import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Subscription } from 'rxjs';
import * as topojson from 'topojson-client';
import {environment} from '../../../../environments/environment.staging';

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
  tooltip:any

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.socket$) this.socket$.complete();
  }

  createMap(): void {
    const width = 1600; // wider for full view
    const height = 800;

    this.svg = d3.select('#map').append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .style('background', '#001f33'); // beautiful dark blue

    this.projection = d3.geoMercator()
      .scale(250) // adjust for full world view
      .translate([width / 2, height / 2]);

    this.path = d3.geoPath().projection(this.projection);

    d3.json('https://unpkg.com/world-atlas@2/countries-110m.json').then((world: any) => {
      const countries: any = topojson.feature(world, world.objects.countries);

      const countryPaths = this.svg.append('g')
        .selectAll('path')
        .data(countries.features)
        .enter().append('path')
        .attr('fill', '#1c1c1c')
        .attr('stroke', '#ccc')
        .attr('d', this.path)
        .on('mouseover', (event, d) => {
          d3.select(event.currentTarget)
            .attr('fill', 'red'); // change to highlight color

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
          d3.select(event.currentTarget)
            .attr('fill', '#1c1c1c'); // revert to original color

          this.tooltip.style('display', 'none');
        });
    });

    this.tooltip = d3.select('#tooltip');
  }

  connectWebSocket(): void {
    this.socket$ = webSocket(environment.webSocketUrl);

    this.subscription = this.socket$.subscribe(data => {
        console.log('Received:', data);
        this.updateMap(data);
      },
      err => console.error(err),
      () => console.warn('Completed!')
    );
  }

  updateMap(event): void {
    if (!event || !event.source || !event.source.origin || !event.source.origin.geolocation) return;

    const source = event.source.origin.geolocation;
    const destination = event.source.destination;
    const category = event.source.category;

    const [xSource, ySource] = this.projection([source.longitude, source.latitude]);

    // Draw glowing expanding bubble with hover tooltip
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
      .on('mouseout', () => {
        this.tooltip.style('display', 'none');
      });

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
        .datum({type: "LineString", coordinates: [[source.longitude, source.latitude], [destination.longitude, destination.latitude]]})
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
}
