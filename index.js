const express = require('express');
const mongoose = require('mongoose');
let port = 6000;
let app = express();

let dataModel = require('./data.model')

mongoose.connect('mongodb://127.0.0.1:27017/samcomntask2').then(() =>
  console.log('database connected')
);

app.post('/api/v1/add', async (erq, res) => {
  try {
    let result = await dataModel.insertMany([
      {
        id: 2167,
        reach: 1,
        date: "2022-09-13T10:12:49.000Z",
        campaignMatch: {
          id: 22,
          id_supplier: 1078,
          supplier: {
            id: 1078,
            name: "mollimolli",
          },
        },
      },
      {
        id: 2167,
        reach: 233,
        date: "2022-01-03T10:12:49.000Z",
        campaignMatch: {
          id: 22,
          id_supplier: 1078,
          supplier: {
            id: 1078,
            name: "mollimolli",
          },
        },
      },
      {
        id: 2168,
        reach: 12,
        date: "2022-09-13T10:14:03.000Z",

        campaignMatch: {
          id: 22,
          id_supplier: 1078,
          supplier: {
            id: 1078,
            name: "mollimolli",
          },
        },
      },
      {
        id: 2182,
        reach: 412,
        date: "2022-02-19T17:01:08.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
          },
        },
      },
      {
        id: 2183,
        reach: 10,
        date: "2022-10-13T10:12:49.000Z",
        campaignMatch: {
          id: 17,
          id_supplier: 1073,
          supplier: {
            id: 1073,

            name: "MaxWin",
          },
        },
      },
      {
        id: 2184,
        reach: 1,
        date: "2022-11-19T17:01:08.000Z",
        campaignMatch: {
          id: 17,
          id_supplier: 1073,
          supplier: {
            id: 1073,
            name: "MaxWin",
          },
        },
      },
      {
        id: 2185,
        reach: 5,
        date: "2022-02-19T17:01:08.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
          },
        },
      },
      {

        id: 2186,
        reach: 6,
        date: "2022-09-21T11:28:02.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
          },
        },
      },
      {
        id: 2187,
        reach: 55,
        date: "2022-09-19T17:01:08.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
          },
        },
      },
      {
        id: 2188,
        reach: 20,
        date: "2022-07-22T09:43:27.000Z",
        campaignMatch: {
          id: 2793,

          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
          },
        },
      },
      {
        id: 2189,
        reach: 7,
        date: "2022-07-22T12:52:41.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
          },
        },
      }])

    res.send(result)
  } catch (error) {
    res.send(error)

  }
})

app.get('/api/v1/get', async (req, res) => {
  try {
    let inputData = await dataModel.find()



    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ];
    let monthLabels = new Set()
    let datasets = []
    for (const item of inputData) {
      const d = new Date(item.date);
      monthLabels.add(month[d.getMonth()]);
      const index = datasets.findIndex((ele) => ele.label === item.campaignMatch.supplier.name)

      if (index === -1) {
        let obj = {
          totalReach: {
            name: item.campaignMatch.supplier.name,
            totalReach: item.reach,
          },
          label: item.campaignMatch.supplier.name,
          monthReach: []
        }
        let months = {}
        months[month[d.getMonth()]] = item.reach;
        obj.monthReach.push(months);
        datasets.push(obj);
      } else {
        let oldData = datasets[index];
        oldData.totalReach.totalReach = oldData.totalReach.totalReach + item.reach;
        let monthsIndex = oldData.monthReach.findIndex((ele) =>
          Object.keys(ele).includes(month[d.getMonth()])
        );

        if (monthsIndex !== -1) {
          oldData.monthReach[monthsIndex][month[d.getMonth()]] += item.reach
        } else {
          let months = {};
          months[month[d.getMonth()]] = item.reach;
          oldData.monthReach.push(months);
        };
        datasets[index] = oldData
      }
    }
    const result = {
      monthLabels: [...monthLabels],
      datasets
    }
    res.send(result)
  } catch (error) {
    res.send(error)

  }
})


app.listen(port, () => {
  console.log("server connected to port: ", port);
});