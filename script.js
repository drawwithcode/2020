var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1uGv_vV2twdoZQkg7jsPOv2ZVq7AiaUNuTV9miaM05Lo/edit?usp=sharing';

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: false } )
  }

  function showInfo(data, tabletop) {

    let lectures = data.lectures.elements;
    let assignments = data.assignments.elements;
    let assignmentsList = data.assignments.columnNames.slice(3, data.assignments.columnNames.length);

    console.log(lectures, assignments, assignmentsList);

    let lessons = d3.select("#lessons");

    lessons.selectAll("li")
    .data(lectures)
    .enter()
    .html(d => {
      if (d.link != "") {
        console.log(d.link != "");
        let lesson = lessons.append("li");
        lesson.append("p")
        .append("a")
        .attr("href", d.link)
        .attr("target", "_blank")
        .text(d.title);

        lesson.append("p")
        .text(d.subtitle);

        lesson.append("p")
        .text(d.date);
      }
    });

    let assignment = d3.select('#assignments').selectAll('.assignment').data(data.assignments.columnNames.slice(3, data.assignments.columnNames.length))
  assignment.exit();
  assignment = assignment.enter().append('div')
    .classed('assignment', true)
    .merge(assignment)
    .append('div')
    .append('h3')
    .datum(function(d) {
      return d
    })
    .html(function(d) {
      return d;
    })
    .on('click', function(d) {

      if (d3.select(this).classed("opened")) {
        d3.selectAll('.assignment>div>p:not(this)').classed('opened', false)
        d3.selectAll('.student-assignment').remove();
      } else {
        d3.selectAll('.assignment>div>p:not(this)').classed('opened', false)
        d3.selectAll('.student-assignment').remove();

        d3.select(this).classed("opened", !d3.select(this).classed("opened"))

        let box = d3.select(this.parentNode).append("ul");
        let thisData = data.assignments.elements.filter(function(e) {
          return e[d]
        })

        studentAssignment = box.selectAll('.student-assignment').data(thisData, function(e) {
          return e.github_username + '-' + e[d];
        })

        studentAssignment.exit().remove();

        studentAssignment = studentAssignment.enter().append('li')
          .classed('student-assignment', true)
          .merge(studentAssignment)

        let single = studentAssignment.append('div').style('display', 'none').style('opacity', 0)

        single.append('a')
          .attr('class', 'assignment-picture')
          .attr('target', '_blank')
          .attr('href', function(e) {
            let repo = e[d].split('/')
            repo = repo[repo.length-1]
            e.repo = repo
            return `https://drawwithcode.github.io/${repo}`;
          })
          .style('background-image', function(e) {
            return `url("https://raw.githubusercontent.com/drawwithcode/${e.repo}/master/cover.png"),url("https://via.placeholder.com/150x150/18FF68/000?text=no+image")`;
          })
        single.append('p').classed('student-name', true).html(function(e) {
          // console.log(e)
          return `${e['surname-name']} <a style="color:var(--orange);" target="_blank" href="https://github.com/drawwithcode/${e[d]}"> <&sol;> </a>`
        })

        single.transition()
          .duration(500)
          .delay(function(e, i) {
            return i * 10
          })
          .style('opacity', 1)
          .style('display', 'block')
      }

    })

    // assignmentPanel.selectAll("li")
    // .data(assignments)
    // .enter()
    // .html(d => {
    //   if (d.github != "") {
    //     console.log(d.link != "");
    //     assignmentPanel.append("li")
    //     .append("a")
    //     .attr("href", d.link)
    //     .attr("target", "_blank")
    //     .text(d.name);
    //   }
    // });
  }

  window.addEventListener('DOMContentLoaded', init)
