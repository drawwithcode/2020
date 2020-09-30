const pages = [
	{
		"label":"Home",
		"url":"./"
	},
	{
		"label":"Lessons",
		"url":"./lessons.html"
	},
	{
		"label":"Assignments",
		"url":"./assignments.html"
	},
	{
		"label":"Team Projects",
		"url":"./team-projects.html"
	},
	// {
	// 	"label":"Previous Editions",
	// 	"url":"https://drawwithcode.github.io"
	// }
]

d3.select("#navigation")
	.classed('row', true)
	.append('div')
	.classed('col-12', true)
	.selectAll('a').data(pages).join('a')
	.classed('navigation-link', true)
	.attr('href',d=>d.url)
	.text(d=>d.label)

d3.select("#footer")
	.classed('row', true)
	.classed('my-5', true)	
	.html(`
<div class="col-4">
	<h3 class="mb-3">Faculty</h3>
	<p>Michele Mauri</p>
	<p>Tommaso Elli</p>
	<p>Andrea Benedetti</p>
	<br/>
	<p><a href="https://drawwithcode.github.io">Previous Editions</a></p>
</div>
<div class="col-4">
	<h3 class="mb-3">&MediumSpace;</h3>
	<img style="margin:auto;" src="logo-density.svg" />
</div>
<div class="col-4">
	<h3 class="mb-3">&MediumSpace;</h3>
	<img style="margin:auto;" src="logo-poli.svg" />
</div>
	`);

	d3.select('#intro')
		.classed('row my-5', true)
		.append('div')
			.classed('col-12', true)
			.html(`
<h1>Draw With Code: Creative Coding (5th edition)</h1>
<p>Coding made fun! Learn to design interactive and unexpected experiences for screens of all sizes in this elective course at Politecnico di Milano, Design School. The course is open to all Communication Design students, both enrolled in a bachelor and in a master program.</p>
			`);