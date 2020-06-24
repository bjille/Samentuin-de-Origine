import moment from "moment";

export const formatData = (groenten, zaaikalender) => {
  console.log("formatData");
  let kalenderData = [];

  let perceelInfo = groenten.map((groente) => {
    let color;
    groente.naam === "aardappel" ? (color = "red") : (color = "green");
    return {
      title: groente.naam,
      start: formatDate(groente.actieStartDate),
      end: formatDate(groente.actieEndDate),
      color: getcolor(groente.type),
      // end: this.formatDate(groente.oogsten)
      source: "perceelinfo",
      groupId: 0,
    };
  });

  let zaaikalenderData = zaaikalender.map((kalenderItem) => {
    return {
      title: kalenderItem.naam + " (" + kalenderItem.type + ") " + "zaaien",
      start: moment()
        .day("Monday")
        .week(kalenderItem.zaaien_van)
        .format("YYYY-MM-DD"),
      end: moment()
        .day("Sunday")
        .week(kalenderItem.zaaien_tot)
        .format("YYYY-MM-DD"),
      color: "lightgrey",
      textColor: "black",
      source: "zaaikalender",
      groupId: 1,
    };
  });
  kalenderData = [
    ...perceelInfo,
    ...zaaikalenderData,
    { title: "testdata", start: "2020-02-07", groupId: 2 },
  ];
  return kalenderData;
};

const formatDate = (date) => {
  const newDate = moment(date, "DD-MM-YYYY");
  return newDate.format("YYYY-MM-DD");
};

const getcolor = (type) => {
  if (type === "manualAction") {
    return "blue";
  }
  if (type === "groenteAction") {
    return "green";
  }
};
