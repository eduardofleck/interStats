//The maximum execute anonymous code length is 32000.
const fs = require("fs").promises;
const parse = require("csv-parse/lib/sync");

const CSVDelimiter = ",";
//Values to convert to boolean
const booleanTrueValues = ["TRUE", "1", "YES", "ANO"];
const booleanFalseValues = ["FALSE", "0", "NO", "NE"];

//Values for picklist translation
// const pickListProductCategory = [
//   { category: "NonLife", synonymous: ["Non Life", "NonLife"] },
//   { category: "Saving", synonymous: ["Savings"] },
//   { category: "Other", synonymous: [""] },
// ];

const teamsIds = [
  { id: "1", synonymous: ["Inter", "Internacional"] },
  { id: "2", synonymous: ["Botafogo"] },
  { id: "3", synonymous: ["Bragantino", "RB Bragantino"] },
  { id: "4", synonymous: ["Palmeiras"] },
  { id: "5", synonymous: ["Flamengo"] },
  { id: "6", synonymous: ["Athletico-PR", "Atlético-PR"] },
  { id: "7", synonymous: ["Grêmio"] },
  { id: "8", synonymous: ["Atlético-MG"] },
  { id: "9", synonymous: ["Fluminense"] },
  { id: "10", synonymous: ["Fortaleza"] },
  { id: "11", synonymous: ["São Paulo"] },
  { id: "12", synonymous: ["Cuiabá", "Cuiabá-MT"] },
  { id: "13", synonymous: ["Cruzeiro"] },
  { id: "14", synonymous: ["Corinthians"] },
  { id: "15", synonymous: ["Bahia", "EC Bahia"] },
  { id: "16", synonymous: ["Santos", "Santos FC"] },
  { id: "17", synonymous: ["Goiás", "Goiás EC"] },
  { id: "18", synonymous: ["Vasco da Gama"] },
  { id: "19", synonymous: ["Coritiba", "Coritiba FC"] },
  { id: "20", synonymous: ["América-MG"] },
  { id: "21", synonymous: ["Ceará SC"] },
  { id: "22", synonymous: ["Atlético-GO"] },
  { id: "23", synonymous: ["Sport Recife"] },
  { id: "24", synonymous: ["Santo André"] },
  { id: "25", synonymous: ["EC Vitória"] },
  { id: "26", synonymous: ["Náutico"] },
  { id: "27", synonymous: ["Avaí FC"] },
  { id: "28", synonymous: ["Barueri"] },
  { id: "29", synonymous: ["Juventude"] },
  { id: "30", synonymous: ["Chapecoense"] },
  { id: "31", synonymous: ["Figueirense FC"] },
  { id: "32", synonymous: ["Guarani"] },
  { id: "33", synonymous: ["Paraná"] },
  { id: "34", synonymous: ["Ponte Preta"] },
  { id: "35", synonymous: ["São Caetano"] },
  { id: "36", synonymous: ["Santa Cruz"] },
  { id: "37", synonymous: ["América-RN"] },
  { id: "38", synonymous: ["Portuguesa"] },
  { id: "39", synonymous: ["Ipatinga FC"] },
  { id: "40", synonymous: ["CSA"] },
  { id: "41", synonymous: ["Paysandu SC"] },
  { id: "42", synonymous: ["Criciúma EC"] },
  { id: "43", synonymous: ["Joinville-SC"] },
  { id: "44", synonymous: ["Brasiliense-DF"] },
];

(async function () {
  const content = await fs.readFile(`./brasileiro.csv`);
  // Parse the CSV content
  const records = parse(content);

  //console.log(records.slice(0, 2));

  //TODO
  // estadio
  // arbitro
  // publico
  // publico_max
  // tecnico_mandante
  // tecnico_visitante
  // colocacao_mandante
  // colocacao_visitante

  //This is not a mapping for the CSV
  const tableAttributes = [
    {
      name: "idChampionship",
      active: true,
      column: "ANO_CAMPEONATO",
    },
    {
      name: "idRound",
      active: true,
      column: "RODADA",
    },
    {
      name: "idTeamHome",
      active: true,
      column: "TIME_MANDANTE",
    },
    {
      name: "scoreTeamHome",
      active: true,
      column: "GOLS_MANDANTE",
    },
    {
      name: "idTeamaway",
      active: true,
      column: "TIME_VISITANTE",
    },
    {
      name: "scoreTeamaway",
      active: true,
      column: "GOLS_VISITANTE",
    },
    {
      name: "gameDate",
      active: true,
      column: "DATA",
      dataType: "string",
    },
  ];

  //Array of strings that holds the CSV
  var scriptLines = [];

  records.slice(1).forEach((record) => {
    // Convert columns from record to a object with named attributes
    // HERE US THE MAPPING FOR CSV
    let gameCsvRecords = {
      ANO_CAMPEONATO: record[0],
      DATA: record[1],
      RODADA: record[2],
      ESTADIO: record[3],
      ARBITRO: record[4],
      PUBLICO: record[5],
      PUBLICO_MAX: record[6],
      TIME_MANDANTE: record[7],
      TIME_VISITANTE: record[8],
      TECNICO_MANDANTE: record[9],
      TECNICO_VISITANTE: record[10],
      COLOCACAO_MANDANTE: record[11],
      COLOCACAO_VISITANTE: record[12],
      VALOR_EQUIPE_TITULAR_MANDANTE: record[13],
      VALOR_EQUIPE_TITULAR_VISITANTE: record[14],
      IDADE_MEDIA_TITULAR_MANDANTE: record[15],
      IDADE_MEDIA_TITULAR_VISITANTE: record[16],
      GOLS_MANDANTE: record[17],
      GOLS_VISITANTE: record[18],
      GOLS_1_TEMPO_MANDANTE: record[19],
      GOLS_1_TEMPO_VISITANTE: record[20],
      ESCANTEIOS_MANDANTE: record[21],
      ESCANTEIOS_VISITANTE: record[22],
      FALTAS_MANDANTE: record[23],
      FALTAS_VISITANTE: record[24],
      CHUTES_BOLA_PARADA_MANDANTE: record[25],
      CHUTES_BOLA_PARADA_VISITANTE: record[26],
      DEFESAS_MANDANTE: record[27],
      DEFESAS_VISITANTE: record[28],
      IMPEDIMENTOS_MANDANTE: record[29],
      IMPEDIMENTOS_VISITANTE: record[30],
      CHUTES_MANDANTE: record[31],
      CHUTES_VISITANTE: record[32],
      CHUTES_FORA_MANDANTE: record[33],
      CHUTES_FORA_VISITANTE: record[34],
    };

    //Make team home has ID
    teamsIds.forEach((team) => {
      if (team.synonymous.includes(gameCsvRecords.TIME_MANDANTE)) {
        gameCsvRecords.TIME_MANDANTE = team.id;
      }
    });

    //Make team away has ID
    teamsIds.forEach((team) => {
      if (team.synonymous.includes(gameCsvRecords.TIME_VISITANTE)) {
        gameCsvRecords.TIME_VISITANTE = team.id;
      }
    });

    let line = "INSERT INTO GAME (";
    tableAttributes.forEach((attribute) => {
      if (attribute.active) {
        if (line.lastIndexOf("(") + 1 !== line.length) {
          line += ", ";
        }
        line += attribute.name;
      }
    });

    line += ") VALUES (";

    tableAttributes.forEach((attribute) => {
      if (attribute.active) {
        if (line.lastIndexOf("(") + 1 !== line.length) {
          line += ", ";
        }
        if (attribute.dataType === "string") {
          line += "'" + gameCsvRecords[attribute.column] + "'";
        } else {
          line += gameCsvRecords[attribute.column];
        }
      }
    });
    line += ");";

    scriptLines.push(line);
  });

  fs.writeFile(
    "./output/database_insert.txt",
    scriptLines.join("\n"),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
})();
