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
	}
]

d3.select("#navigation").selectAll('a').data(pages).join('a')
	.classed('navigation-link', true)
	.attr('href',d=>d.url)
	.text(d=>d.label)