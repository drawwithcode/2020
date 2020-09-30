var corsProxy = "https://api.allorigins.win/raw?url=";

var lecturesSpreadsheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjlaJ8up3sDV9wwxFH_fWMW9oQo1ANFSUxj7qH2l4_MaFm1oJma534YUL1VVCxow60Hbsw3KGL_L-Z/pub?output=csv';

var lectures = corsProxy + lecturesSpreadsheet;

console.log(lectures);

d3.csv(lectures).then(data => {
  console.log(data);

  let lessons = d3.select("#lessons");

      lessons.selectAll("li")
      .data(data)
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
})
