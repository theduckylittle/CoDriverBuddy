/*
 *
 * Co-Driver Buddy
 * (c) 2015 Dan "Ducky" Little
 * CC by SA, see LICENSE in project for full text.
 *
 */


// Some global settings
var CONF = {
	center: 400,
	innerRadius: 230,
	outerRadius: 350,
	size: 20
};


function drawCoDriverHelper() {
	var svg = d3.select('svg');
	svg.attr('height', CONF.center*2)
		.attr('width', CONF.center*2);

	// create a "centering" transfomation group
	var main_g = d3.select('svg')
		.append('g')
			.attr('transform', 'translate('+CONF.center+','+CONF.center+')');

	// add a circle for the center marker.
	main_g.append('circle')
		.attr('cx', 0).attr('cy', 0)
		.attr('r', 5)
		.style('fill', 'black');

	// add a circle for the outer.
	main_g.append('circle')
		.attr('cx', 0).attr('cy', 0)
		.attr('r', CONF.center)
		.style('fill', 'none')
		.style('stroke', 'black');

	// we should have 60 ticks, one for each minute.
	var ticks = [];
	for(var i = 0; i < 60; i++) {
		ticks.push(i);
	}

	// Create rotated tick groups.
	var tick_groups = main_g.selectAll('g.tick-group')
		.data(ticks)
		.enter()
		.append('g')
			.attr('class', 'tick-group')
			.attr('transform', function(d, i) {
				return 'rotate('+6*i+')';
			});

	// Draw the inside "out" minute.
	tick_groups.append('text')
		.attr('x', CONF.innerRadius)
		.attr('y', 0)
		.attr('text-anchor', 'end')
		.style('font-size', CONF.size)
		.text(function(d, i) {
			// this will format the minutes with a ":"
			//  and properly 0 pad them.
			if(d < 10) {
				return ':0'+d;
			} else {
				return ':'+d
			}
		});

	// Draw the outside minutes
	tick_groups.append('text')
		.attr('x', CONF.outerRadius-CONF.size/2.0)
		.attr('y', 0)
		.attr('text-anchor', 'start')
		.style('font-size', CONF.size)
		.text(function(d) {
			// these minutes need to count-down,
			//  while the insize minutes count up
			if(d == 0) { return ''; }
			return ''+(60-d);
		});

	// Draw the tick lines.
	var lines = main_g.selectAll('g.lines')
		.data(ticks)
		.enter()
		.append('g')
			.attr('class', 'lines')
			.attr('transform', function(d, i) {
				return 'rotate('+(6*i-1)+')';
			});

	// draw the actual lines
	lines.append('line')
		.attr('x1', CONF.innerRadius+5).attr('y1', 0)
		.attr('x2', CONF.outerRadius-15).attr('y2', 0)
		.style('stroke', 'black');

	// when at the 0th rotation, mark the timing marker
	lines.append('polygon')
		.filter(function(d, i) {
			return d == 0;
		})
		.attr('points', [
			[(CONF.innerRadius+CONF.outerRadius)/2.0, 0],
			[CONF.outerRadius-5, -1*CONF.size],
			[CONF.outerRadius-5, CONF.size],
		])
		.style('fill', 'red');

	// labels!

	main_g.append('text')
		.attr('x', 0)
		.attr('y', -1 * CONF.innerRadius + CONF.size*3)
		.attr('text-anchor', 'middle')
		.style('font-size', CONF.size)
		.style('font-style', 'italic')
		.text('Out Minute');

	main_g.append('text')
		.attr('x', '0')
		.attr('y', -1 * CONF.outerRadius - CONF.size)
		.attr('text-anchor', 'middle')
		.style('font-size', CONF.size)
		.style('font-style', 'italic')
		.text('Transit Time');

	main_g.append('g')
		.attr('transform', 'rotate(90)')
		.append('text')
			.attr('x', 0)
			.attr('y', -1 * CONF.outerRadius - CONF.size)
			.attr('text-anchor', 'middle')
			.style('fill', 'red')
			.style('font-size', CONF.size)
			.style('font-style', 'italic')
			.text('In Minute');

	main_g.append('text')
		.attr('x', 0)
		.attr('y', CONF.innerRadius - CONF.size * 4)
		.attr('text-anchor', 'middle')
		.style('font-size', CONF.size)
		.style('font-family', 'serif')
		.style('font-style', 'italic')
		.text('Co-Driver Buddy');
	
	main_g.append('text')
		.attr('x', 0)
		.attr('y', CONF.innerRadius - CONF.size * 3)
		.attr('text-anchor', 'middle')
		.style('font-size', CONF.size*.75)
		.style('font-family', 'serif')
		.style('font-style', 'italic')
		.text('by Dan "Ducky" Little');

}

// draw the codriver Helper!
drawCoDriverHelper();
