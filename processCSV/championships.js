const getChampionshipId = (championshipValue, brasileiraoOrCopaDoBrasil) => {
  const copaIds = [
    { id: "1989_CDB", synonymous: ["1989"] },
    { id: "1990_CDB", synonymous: ["1990"] },
    { id: "1991_CDB", synonymous: ["1991"] },
    { id: "1992_CDB", synonymous: ["1992"] },
    { id: "1993_CDB", synonymous: ["1993"] },
    { id: "1994_CDB", synonymous: ["1994"] },
    { id: "1995_CDB", synonymous: ["1995"] },
    { id: "1996_CDB", synonymous: ["1996"] },
    { id: "1997_CDB", synonymous: ["1997"] },
    { id: "1998_CDB", synonymous: ["1998"] },
    { id: "1999_CDB", synonymous: ["1999"] },
    { id: "2000_CDB", synonymous: ["2000"] },
    { id: "2001_CDB", synonymous: ["2001"] },
    { id: "2002_CDB", synonymous: ["2002"] },
    { id: "2003_CDB", synonymous: ["2003"] },
    { id: "2004_CDB", synonymous: ["2004"] },
    { id: "2005_CDB", synonymous: ["2005"] },
    { id: "2006_CDB", synonymous: ["2006"] },
    { id: "2007_CDB", synonymous: ["2007"] },
    { id: "2008_CDB", synonymous: ["2008"] },
    { id: "2009_CDB", synonymous: ["2009"] },
    { id: "2010_CDB", synonymous: ["2010"] },
    { id: "2011_CDB", synonymous: ["2011"] },
    { id: "2012_CDB", synonymous: ["2012"] },
    { id: "2013_CDB", synonymous: ["2013"] },
    { id: "2014_CDB", synonymous: ["2014"] },
    { id: "2015_CDB", synonymous: ["2015"] },
    { id: "2016_CDB", synonymous: ["2016"] },
    { id: "2017_CDB", synonymous: ["2017"] },
    { id: "2018_CDB", synonymous: ["2018"] },
    { id: "2019_CDB", synonymous: ["2019"] },
    { id: "2020_CDB", synonymous: ["2020"] },
    { id: "2021_CDB", synonymous: ["2021"] },
    { id: "2022_CDB", synonymous: ["2022"] },
    { id: "2023_CDB", synonymous: ["2023"] },
  ];

  const brasileiraoIds = [
    { id: "1989_BR", synonymous: ["1989"] },
    { id: "1990_BR", synonymous: ["1990"] },
    { id: "1991_BR", synonymous: ["1991"] },
    { id: "1992_BR", synonymous: ["1992"] },
    { id: "1993_BR", synonymous: ["1993"] },
    { id: "1994_BR", synonymous: ["1994"] },
    { id: "1995_BR", synonymous: ["1995"] },
    { id: "1996_BR", synonymous: ["1996"] },
    { id: "1997_BR", synonymous: ["1997"] },
    { id: "1998_BR", synonymous: ["1998"] },
    { id: "1999_BR", synonymous: ["1999"] },
    { id: "2000_BR", synonymous: ["2000"] },
    { id: "2001_BR", synonymous: ["2001"] },
    { id: "2002_BR", synonymous: ["2002"] },
    { id: "2003_BR", synonymous: ["2003"] },
    { id: "2004_BR", synonymous: ["2004"] },
    { id: "2005_BR", synonymous: ["2005"] },
    { id: "2006_BR", synonymous: ["2006"] },
    { id: "2007_BR", synonymous: ["2007"] },
    { id: "2008_BR", synonymous: ["2008"] },
    { id: "2009_BR", synonymous: ["2009"] },
    { id: "2010_BR", synonymous: ["2010"] },
    { id: "2011_BR", synonymous: ["2011"] },
    { id: "2012_BR", synonymous: ["2012"] },
    { id: "2013_BR", synonymous: ["2013"] },
    { id: "2014_BR", synonymous: ["2014"] },
    { id: "2015_BR", synonymous: ["2015"] },
    { id: "2016_BR", synonymous: ["2016"] },
    { id: "2017_BR", synonymous: ["2017"] },
    { id: "2018_BR", synonymous: ["2018"] },
    { id: "2019_BR", synonymous: ["2019"] },
    { id: "2020_BR", synonymous: ["2020"] },
    { id: "2021_BR", synonymous: ["2021"] },
    { id: "2022_BR", synonymous: ["2022"] },
    { id: "2023_BR", synonymous: ["2023"] },
  ];

  let champId = null;

  if (brasileiraoOrCopaDoBrasil === "BR") {
    brasileiraoIds.forEach((champ) => {
      if (champ.synonymous.includes(championshipValue)) {
        champId = champ.id;
      }
    });
  } else if (brasileiraoOrCopaDoBrasil === "COPA") {
    copaIds.forEach((champ) => {
      if (champ.synonymous.includes(championshipValue)) {
        champId = champ.id;
      }
    });
  }

  return champId;
};

module.exports = { getChampionshipId };
