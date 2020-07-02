function draw_gong(canvas, myrashis) {
    canvas.font = '7pt Arial';
    canvas.textAlign = 'center';
    canvas.fillStyle = 'black';

    var pos = [125, 93, 62, 43, 50, 54, 111, 104,
        50, 154, 62, 165, 125, 117, 188, 165,
        200, 154, 139, 104, 200, 54, 188, 43];

    canvas.fillText(myrashis[0], pos[0], pos[1]);
    canvas.fillText(myrashis[1], pos[2], pos[3]);
    canvas.fillText(myrashis[2], pos[4], pos[5]);
    canvas.fillText(myrashis[3], pos[6], pos[7]);
    canvas.fillText(myrashis[4], pos[8], pos[9]);
    canvas.fillText(myrashis[5], pos[10], pos[11]);
    canvas.fillText(myrashis[6], pos[12], pos[13]);
    canvas.fillText(myrashis[7], pos[14], pos[15]);
    canvas.fillText(myrashis[8], pos[16], pos[17]);
    canvas.fillText(myrashis[9], pos[18], pos[19]);
    canvas.fillText(myrashis[9], pos[18], pos[19]);
    canvas.fillText(myrashis[10], pos[20], pos[21]);
    canvas.fillText(myrashis[11], pos[22], pos[23]);
}

function draw_grahas(canvas, mybhavas) {
    canvas.font = '8pt Arial';
    canvas.textAlign = 'center';
    canvas.fillStyle = 'rgb(0,0,255,1)';

    var pos = [125, 53, 62, 13, 26, 54, 62, 104,
        26, 154, 62, 195, 125, 154, 188, 195,
        224, 154, 189, 104, 224, 54, 188, 13];

    /*if (mybhavas[i].length > 8) 
          canvas.font = '7pt Arial';
      else 
          canvas.font = '8pt Arial';
    */
    canvas.fillText(mybhavas[0], pos[0], pos[1]);
    canvas.fillText(mybhavas[1], pos[2], pos[3]);
    canvas.fillText(mybhavas[2], pos[4], pos[5]);
    canvas.fillText(mybhavas[3], pos[6], pos[7]);
    canvas.fillText(mybhavas[4], pos[8], pos[9]);
    canvas.fillText(mybhavas[5], pos[10], pos[11]);
    canvas.fillText(mybhavas[6], pos[12], pos[13]);
    canvas.fillText(mybhavas[7], pos[14], pos[15]);
    canvas.fillText(mybhavas[8], pos[16], pos[17]);
    canvas.fillText(mybhavas[9], pos[18], pos[19]);
    canvas.fillText(mybhavas[10], pos[20], pos[21]);
    canvas.fillText(mybhavas[11], pos[22], pos[23]);
}

function draw_empty_chart(canvas, canvas_chart, _x, _y) {
    canvas.lineWidth = 1;
    canvas.strokeStyle = '000000';
    canvas.shadowColor = "black";
    canvas.shadowBlur = 0;

    canvas_chart.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    canvas_chart.addEventListener("mousedown", onmousedown, false);

    var x = _x, y = _y;

    /* outer square */
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x + 250, y);
    canvas.lineTo(x + 250, y + 200);
    canvas.lineTo(x, y + 200);
    canvas.lineTo(x, y);
    canvas.lineJoin = 'miter';
    canvas.stroke();

    /* inner square  */
    canvas.beginPath();
    canvas.moveTo(x, y + 200 / 2);
    canvas.lineTo(x + 250 / 2, y);
    canvas.lineTo(x + 250, y + 200 / 2);
    canvas.lineTo(x + 250 / 2, y + 200);
    canvas.lineTo(x, y + 200 / 2);
    canvas.lineJoin = 'miter';
    canvas.stroke();

    /* diagonals of a square */
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x + 250, y + 200);
    canvas.stroke();
    canvas.beginPath();
    canvas.moveTo(x, y + 200);
    canvas.lineTo(x + 250, y);
    canvas.stroke();
}

function draw_jataka(datao) {
    generate_house_array(datao, 'rasi');
    var array = []
    for (a in datao['dasa']) {
        array.push(datao['dasa'][a]);
    }
    var infoarr = [];

    infoarr.push(['Name', datao['info']['Name']]);
    infoarr.push(['Place', datao['info']['Place']]);
    infoarr.push(["lon", datao['info']["lon"]]);
    infoarr.push(["lat", datao['info']["lat"]]);
    infoarr.push(["Date Of Birth", datao['info']["DateOfBirth"]]);
    infoarr.push(["Time Of Birth", datao['info']["TimeOfBirth"]]);
    infoarr.push(["Langa", datao['info']["Langa"]]);
    infoarr.push(["Ayanamsa", datao['info']["Ayanamsa"]]);
    infoarr.push(["Nakshathra", datao['info']["Nakshathra"]['nak']]);
    infoarr.push(["Nakshathra Pada", datao['info']["Nakshathra"]['pada']]);
    infoarr.push(["Dasa", datao['info']["Dasa"]]);
    infoarr.push(["Current Period", datao['info']["CurrentPeriod"]]);
    infoarr.push(['Ayanamsa', datao['info']['Ayanamsa']]);

    $('#example').DataTable({
        data: infoarr,
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        columns: [
            { title: "" },
            { title: "" },
        ]
    });

    var infoarr1 = [];

    var grahas_arr = [];
    for (a in datao['planets']) {
        var tm = (datao['planets'][a]['character'] == true) ? '(R)' : '';
        grahas_arr.push([datao['planets'][a]['name'] + tm, datao['planets'][a]['pos'].toFixed(2), datao['planets'][a]['rasi']]);
    }

    $('#example1').DataTable({
        data: grahas_arr,
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        columns: [
            { title: "graha" },
            { title: "lon" },
            { title: "rasi" }
        ]
    });

    var data = array.sort(function (a, b) { return parseFloat(a.start) - parseFloat(b.start); });
    var current = '';
    var d = { title: 'Dasha' };
    var list = new Array();
    $.each(data, function (i, item) {
        var list1 = new Array();
        var subarray = [];

        if ('current' in item) {
            // delete item['current'];
            subarray.push(item.current);
        }

        for (a in item.subDasas) {
            subarray.push(item.subDasas[a]);
        }

        var subDasas = subarray.sort(function (a, b) { return parseFloat(a.start) - parseFloat(b.start); });
        $.each(subDasas, function (j, it) {
            if ('dasa' in it) {
                list1.push({ title: it.dasa + ": " + it.startDate })
            }
        });
        list.push({ title: item.dasa + ": " + item.startDate, nodes: list1 })

    });
    d['nodes'] = list;
    // var tree = new TreeDataView({
    //     append: $('#tree-example-3'),
    //     openLevel: 2,
    // }, d);
    // tree.render();

    $('#tree-example-3').jstree({
        'core': {
            'data': [
                'Simple root node',
                {
                    'text': 'Root node 2',
                    'state': {
                        'opened': true,
                        'selected': true
                    },
                    'children': [
                        { 'text': 'Child 1' },
                        'Child 2'
                    ]
                }
            ]
        }
    });
}

function draw_tuli(canvas) {
    canvas.font = '7pt Arial';
    canvas.textAlign = 'center';
    var xoffset = 330;
    var pos = [125, 93, 62, 43, 50, 54, 111, 104,
        50, 154, 62, 165, 125, 117, 188, 165,
        200, 154, 139, 104, 200, 54, 188, 43];
    canvas.fillStyle = "rgb(0,0,0,1)";

    canvas.textAlign = 'left';
    canvas.fillStyle = "#000000";
    canvas.fillText("Rasi Kundli", 2, 215);

    canvas.textAlign = 'left';
    canvas.fillStyle = "#000000";
    canvas.fillText("Transit", 2, 450);

    canvas.fillText('', pos[0] + xoffset, 105);
    canvas.textAlign = 'left';
    canvas.fillStyle = "#000000";
    canvas.fillText("D9 - Navamsa", xoffset, 215);

    canvas.fillText('', pos[0] + xoffset, 105);
    canvas.textAlign = 'left';
    canvas.fillStyle = "#000000";
    canvas.fillText("Moon Chart", xoffset, 450);
}

function draw_d9_chart(canvas, zodiac, house, d) {
    canvas.font = '7pt Arial';
    canvas.textAlign = 'center';
    var xoffset = 330;
    var pos = [125, 93, 62, 43, 50, 54, 111, 104,
        50, 154, 62, 165, 125, 117, 188, 165,
        200, 154, 139, 104, 200, 54, 188, 43];

    canvas.fillStyle = "rgb(0,0,0,1)";
    canvas.fillText(zodiac[0], pos[0] + xoffset, pos[1]);
    canvas.fillText(zodiac[1], pos[2] + xoffset, pos[3]);
    canvas.fillText(zodiac[2], pos[4] + xoffset, pos[5]);
    canvas.fillText(zodiac[3], pos[6] + xoffset, pos[7]);
    canvas.fillText(zodiac[4], pos[8] + xoffset, pos[9]);
    canvas.fillText(zodiac[5], pos[10] + xoffset, pos[11]);
    canvas.fillText(zodiac[6], pos[12] + xoffset, pos[13]);
    canvas.fillText(zodiac[7], pos[14] + xoffset, pos[15]);
    canvas.fillText(zodiac[8], pos[16] + xoffset, pos[17]);
    canvas.fillText(zodiac[9], pos[18] + xoffset, pos[19]);
    canvas.fillText(zodiac[9], pos[18] + xoffset, pos[19]);
    canvas.fillText(zodiac[10], pos[20] + xoffset, pos[21]);
    canvas.fillText(zodiac[11], pos[22] + xoffset, pos[23]);

    canvas.font = '8pt Arial';
    canvas.textAlign = 'center';
    var pos = [125, 53, 62, 13, 26, 54, 62, 104,
        26, 154, 62, 195, 125, 154, 188, 195,
        224, 154, 189, 104, 224, 54, 188, 13];

    canvas.fillStyle = "rgb(255,0,0,1)";
    /*if (mybhavas[i].length > 8) 
          canvas.font = '7pt Arial';
      else 
          canvas.font = '8pt Arial';
    */
    canvas.fillText(house[0].replace(/As/g, ''), pos[0] + xoffset, pos[1]);
    canvas.fillText(house[1].replace(/As/g, ''), pos[2] + xoffset, pos[3]);
    canvas.fillText(house[2].replace(/As/g, ''), pos[4] + xoffset, pos[5]);
    canvas.fillText(house[3].replace(/As/g, ''), pos[6] + xoffset, pos[7]);
    canvas.fillText(house[4].replace(/As/g, ''), pos[8] + xoffset, pos[9]);
    canvas.fillText(house[5].replace(/As/g, ''), pos[10] + xoffset, pos[11]);
    canvas.fillText(house[6].replace(/As/g, ''), pos[12] + xoffset, pos[13]);
    canvas.fillText(house[7].replace(/As/g, ''), pos[14] + xoffset, pos[15]);
    canvas.fillText(house[8].replace(/As/g, ''), pos[16] + xoffset, pos[17]);
    canvas.fillText(house[9].replace(/As/g, ''), pos[18] + xoffset, pos[19]);
    canvas.fillText(house[10].replace(/As/g, ''), pos[20] + xoffset, pos[21]);
    canvas.fillText(house[11].replace(/As/g, ''), pos[22] + xoffset, pos[23]);
}

function draw_transit_chart(canvas, zodiac, house, d) {
    canvas.font = '7pt Arial';
    canvas.textAlign = 'center';
    var xoffset = 0;
    var yoffset = 230;
    var pos = [125, 93, 62, 43, 50, 54, 111, 104,
        50, 154, 62, 165, 125, 117, 188, 165,
        200, 154, 139, 104, 200, 54, 188, 43];

    canvas.fillStyle = "rgb(0,0,0,1)";
    canvas.fillText(zodiac[0], pos[0] + xoffset, pos[1] + yoffset);
    canvas.fillText(zodiac[1], pos[2] + xoffset, pos[3] + yoffset);
    canvas.fillText(zodiac[2], pos[4] + xoffset, pos[5] + yoffset);
    canvas.fillText(zodiac[3], pos[6] + xoffset, pos[7] + yoffset);
    canvas.fillText(zodiac[4], pos[8] + xoffset, pos[9] + yoffset);
    canvas.fillText(zodiac[5], pos[10] + xoffset, pos[11] + yoffset);
    canvas.fillText(zodiac[6], pos[12] + xoffset, pos[13] + yoffset);
    canvas.fillText(zodiac[7], pos[14] + xoffset, pos[15] + yoffset);
    canvas.fillText(zodiac[8], pos[16] + xoffset, pos[17] + yoffset);
    canvas.fillText(zodiac[9], pos[18] + xoffset, pos[19] + yoffset);
    canvas.fillText(zodiac[9], pos[18] + xoffset, pos[19] + yoffset);
    canvas.fillText(zodiac[10], pos[20] + xoffset, pos[21] + yoffset);
    canvas.fillText(zodiac[11], pos[22] + xoffset, pos[23] + yoffset);

    canvas.font = '8pt Arial';
    canvas.textAlign = 'center';
    var pos = [125, 53, 62, 13, 26, 54, 62, 104,
        26, 154, 62, 195, 125, 154, 188, 195,
        224, 154, 189, 104, 224, 54, 188, 13];

    canvas.fillStyle = "rgb(255,0,0,1)";
    canvas.fillText(house[0].replace(/As/g, ''), pos[0] + xoffset, pos[1] + yoffset);
    canvas.fillText(house[1].replace(/As/g, ''), pos[2] + xoffset, pos[3] + yoffset);
    canvas.fillText(house[2].replace(/As/g, ''), pos[4] + xoffset, pos[5] + yoffset);
    canvas.fillText(house[3].replace(/As/g, ''), pos[6] + xoffset, pos[7] + yoffset);
    canvas.fillText(house[4].replace(/As/g, ''), pos[8] + xoffset, pos[9] + yoffset);
    canvas.fillText(house[5].replace(/As/g, ''), pos[10] + xoffset, pos[11] + yoffset);
    canvas.fillText(house[6].replace(/As/g, ''), pos[12] + xoffset, pos[13] + yoffset);
    canvas.fillText(house[7].replace(/As/g, ''), pos[14] + xoffset, pos[15] + yoffset);
    canvas.fillText(house[8].replace(/As/g, ''), pos[16] + xoffset, pos[17] + yoffset);
    canvas.fillText(house[9].replace(/As/g, ''), pos[18] + xoffset, pos[19] + yoffset);
    canvas.fillText(house[10].replace(/As/g, ''), pos[20] + xoffset, pos[21] + yoffset);
    canvas.fillText(house[11].replace(/As/g, ''), pos[22] + xoffset, pos[23] + yoffset);
}

function draw_moon_chart(canvas, zodiac, house, d) {
    canvas.font = '7pt Arial';
    canvas.textAlign = 'center';
    var xoffset = 330;
    var yoffset = 230;
    var pos = [125, 93, 62, 43, 50, 54, 111, 104,
        50, 154, 62, 165, 125, 117, 188, 165,
        200, 154, 139, 104, 200, 54, 188, 43];

    canvas.fillStyle = "rgb(0,0,0,1)";
    canvas.fillText(zodiac[0], pos[0] + xoffset, pos[1] + yoffset);
    canvas.fillText(zodiac[1], pos[2] + xoffset, pos[3] + yoffset);
    canvas.fillText(zodiac[2], pos[4] + xoffset, pos[5] + yoffset);
    canvas.fillText(zodiac[3], pos[6] + xoffset, pos[7] + yoffset);
    canvas.fillText(zodiac[4], pos[8] + xoffset, pos[9] + yoffset);
    canvas.fillText(zodiac[5], pos[10] + xoffset, pos[11] + yoffset);
    canvas.fillText(zodiac[6], pos[12] + xoffset, pos[13] + yoffset);
    canvas.fillText(zodiac[7], pos[14] + xoffset, pos[15] + yoffset);
    canvas.fillText(zodiac[8], pos[16] + xoffset, pos[17] + yoffset);
    canvas.fillText(zodiac[9], pos[18] + xoffset, pos[19] + yoffset);
    canvas.fillText(zodiac[9], pos[18] + xoffset, pos[19] + yoffset);
    canvas.fillText(zodiac[10], pos[20] + xoffset, pos[21] + yoffset);
    canvas.fillText(zodiac[11], pos[22] + xoffset, pos[23] + yoffset);

    canvas.font = '8pt Arial';
    canvas.textAlign = 'center';
    var pos = [125, 53, 62, 13, 26, 54, 62, 104,
        26, 154, 62, 195, 125, 154, 188, 195,
        224, 154, 189, 104, 224, 54, 188, 13];

    canvas.fillStyle = "rgb(255,0,0,1)";
    canvas.fillText(house[0].replace(/As/g, ''), pos[0] + xoffset, pos[1] + yoffset);
    canvas.fillText(house[1].replace(/As/g, ''), pos[2] + xoffset, pos[3] + yoffset);
    canvas.fillText(house[2].replace(/As/g, ''), pos[4] + xoffset, pos[5] + yoffset);
    canvas.fillText(house[3].replace(/As/g, ''), pos[6] + xoffset, pos[7] + yoffset);
    canvas.fillText(house[4].replace(/As/g, ''), pos[8] + xoffset, pos[9] + yoffset);
    canvas.fillText(house[5].replace(/As/g, ''), pos[10] + xoffset, pos[11] + yoffset);
    canvas.fillText(house[6].replace(/As/g, ''), pos[12] + xoffset, pos[13] + yoffset);
    canvas.fillText(house[7].replace(/As/g, ''), pos[14] + xoffset, pos[15] + yoffset);
    canvas.fillText(house[8].replace(/As/g, ''), pos[16] + xoffset, pos[17] + yoffset);
    canvas.fillText(house[9].replace(/As/g, ''), pos[18] + xoffset, pos[19] + yoffset);
    canvas.fillText(house[10].replace(/As/g, ''), pos[20] + xoffset, pos[21] + yoffset);
    canvas.fillText(house[11].replace(/As/g, ''), pos[22] + xoffset, pos[23] + yoffset);
}

function generate_house_array(obj) {
    var rashis = {
        "Mesha": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        "Vrishabha": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1],
        "Mithuna": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
        "Kataka": [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
        "Simha": [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4],
        "Kanya": [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5],
        "Thula": [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
        "Vrichika": [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7],
        "Dhanus": [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8],
        "Makara": [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        "Kumbha": [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "Meena": [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    };

    // Rashi
    var rashi = obj['rasi'];
    var grahas = ['', '', '', '', '', '', '', '', '', '', '', ''];
    var as = [];

    var grahas_moon = ['', '', '', '', '', '', '', '', '', '', '', ''];
    var as_moon = [];

    var bava = {};
    for (key in rashi) {
        if (rashi[key].includes("Ascendant")) {
            as = rashis[key];
        }
    }
    for (key in rashi) {
        var tmp = "";
        for (let i = 0; i < rashi[key].length; i++) {
            tmp += rashi[key][i].substring(0, 2) + " ";
        }
        var idx = as.indexOf(rashis[key][0]);
        grahas[idx] = tmp;
    }

    // Moon Information
    for (key in rashi) {
        if (rashi[key].includes("Moon")) {
            as_moon = rashis[key];
        }
    }
    for (key in rashi) {
        var tmp = "";
        for (let i = 0; i < rashi[key].length; i++) {
            tmp += rashi[key][i].substring(0, 2) + " ";
        }
        var idx = as_moon.indexOf(rashis[key][0]);
        grahas_moon[idx] = tmp;
    }

    // Transit
    var grahas_transit = ['', '', '', '', '', '', '', '', '', '', '', ''];
    var rashi_transit = obj['transit'];
    console.log(rashi_transit);
    var as_transit = [];

    var bava_transit = {};
    for (key in rashi_transit) {
        if (rashi_transit[key].includes("Ascendant")) {
            as_transit = rashis[key];
        }
    }
    for (key in rashi_transit) {
        var tmp = "";
        for (let i = 0; i < rashi_transit[key].length; i++) {
            tmp += rashi_transit[key][i].substring(0, 2) + " ";
        }
        var idx = as_transit.indexOf(rashis[key][0]);
        grahas_transit[idx] = tmp;
    }

    // D9

    var grahas9 = ['', '', '', '', '', '', '', '', '', '', '', ''];
    var rashi9 = obj['navamsa'];
    var as9 = [];

    for (key in rashi9) {
        if (rashi9[key].includes("Ascendant")) {
            as9 = rashis[key];
        }
    }

    for (key in rashi9) {
        var tmp = "";
        for (let i = 0; i < rashi9[key].length; i++) {
            tmp += rashi9[key][i].substring(0, 2) + " ";
        }
        var idx = as9.indexOf(rashis[key][0]);
        grahas9[idx] = tmp;
    }

    // drawing

    var canvas_chart = document.getElementById('canvas_chart');
    var mychart = canvas_chart.getContext('2d');
    mychart.clearRect(0, 0, canvas_chart.width, canvas_chart.height);
    canvas_chart.onselectstart = function () { return false; }

    draw_empty_chart(mychart, canvas_chart, 0, 0);
    draw_gong(mychart, as);
    draw_grahas(mychart, grahas);

    draw_empty_chart(mychart, canvas_chart, 0, 230);
    draw_transit_chart(mychart, as_transit, grahas_transit, '');
    draw_empty_chart(mychart, canvas_chart, 330, 230);
    draw_moon_chart(mychart, as_moon, grahas_moon, '');

    // draw_gong(mychart, as_transit);
    // draw_grahas(mychart, grahas_transit);

    // console.log("as9 before: " + as9)
    // console.log("graha9 before: " + grahas9)
    // modified by eiffel
    as9 = as9.slice(-2).concat(as9.slice(0, as9.length - 2))
    grahas9 = grahas9.slice(-2).concat(grahas9.slice(0, grahas9.length - 2))

    draw_empty_chart(mychart, canvas_chart, 330, 0);
    draw_d9_chart(mychart, as9, grahas9, '');
    // console.log("as9 after: " + as9)
    // console.log("graha9 after: " + grahas9)

    draw_tuli(mychart);
}

// The End