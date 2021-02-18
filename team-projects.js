var corsProxy = "https://api.allorigins.win/raw?url=";

var projectsSpreadsheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQAJZtbcyJIfdnVAlneguwrjsw1BpxkclSg5QlWNE1GlB3L98l_Z2Ad-8Lx4ndiIMJ6r_vo4Kr9KUA/pub?output=csv';

var projects = corsProxy + projectsSpreadsheet;

console.log(projects)

d3.csv(projects).then(data => {
  let projects = d3.select("#team-projects");
      projects.selectAll("li")
      .data(data)
      .enter()
      .html(d => {
        console.log(d)
          let project = projects.append("li");

          project.append("img")
          .attr("src", `${d.repo}/raw/master/cover.jpg`)
          .style("width", "200px")
          .style("height", "auto");

          project.append("p")
          .append("a")
          .attr("href", d.link)
          .attr("target", "_blank")
          .style("color", "blue")
          .text(d.title);

          project.append("p")
          .append("a")
          .attr("href", d.repo)
          .attr("target", "_blank")
          .style("color", "blue")
          .text("</>");

          project.append("p")
          .text(d.desc);


      });
})
