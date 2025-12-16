import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { flavorWheelData } from '../data/coffeeData';
import './FlavorWheel.css';

const FlavorWheel = ({ selectedFlavor, selectedCoffee }) => {
  const svgRef = useRef();
  const wheelSize = 500;
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const innerRadius = 80;
  const outerRadius = 220;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // Convert angle data to pie segments
    const numSegments = flavorWheelData.length;
    const segmentAngle = (2 * Math.PI) / numSegments;
    
    const pieData = flavorWheelData.map((item, index) => ({
      ...item,
      startAngle: index * segmentAngle,
      endAngle: (index + 1) * segmentAngle
    }));

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .padAngle(0.02);

    const arcs = g.selectAll('.arc')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('data-flavor', d => d.id);

    arcs.append('path')
      .attr('d', d => arc({
        startAngle: d.startAngle,
        endAngle: d.endAngle
      }))
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('class', d => `flavor-segment ${selectedFlavor === d.id ? 'selected' : ''}`)
      .style('cursor', 'pointer')
      .style('opacity', d => selectedFlavor && selectedFlavor !== d.id ? 0.5 : 1)
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1.05)');
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1)');
      })
      .style('opacity', d => selectedFlavor && selectedFlavor !== d.id ? 0.3 : 1);

    // Add labels
    const labelRadius = (innerRadius + outerRadius) / 2;
    arcs.append('text')
      .attr('transform', d => {
        const midAngle = (d.startAngle + d.endAngle) / 2;
        const [x, y] = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius).centroid({
          startAngle: d.startAngle,
          endAngle: d.endAngle
        });
        const rotation = midAngle * 180 / Math.PI;
        return `translate(${x}, ${y}) rotate(${rotation > 90 && rotation < 270 ? rotation + 180 : rotation})`;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('class', 'flavor-label')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .style('pointer-events', 'none')
      .text(d => d.label);

    // Add center circle
    g.append('circle')
      .attr('r', innerRadius)
      .attr('fill', '#fff')
      .attr('stroke', '#ddd')
      .attr('stroke-width', 2)
      .style('cursor', 'default');

    // Add center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', '#667eea')
      .style('pointer-events', 'none')
      .text('Coffee');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlavor, selectedCoffee]);

  return (
    <div className="flavor-wheel-container">
      <svg
        ref={svgRef}
        width={wheelSize}
        height={wheelSize}
        className="flavor-wheel"
      />
    </div>
  );
};

export default FlavorWheel;

