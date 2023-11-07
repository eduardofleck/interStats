//The maximum execute anonymous code length is 32000.
const fs = require("fs").promises;
const parse = require("csv-parse/lib/sync");
const teamsIds = require("../teams");
const championshipRoundsIds = require("../championshipRounds");
const stadiumsIds = require("../stadiums");
const { createGameCsvRecords } = require("./createGameCsvRecords");
const { getChampionshipId } = require("../championships");

const CSVDelimiter = ",";
//Values to convert to boolean
const booleanTrueValues = ["TRUE", "1", "YES", "ANO"];
const booleanFalseValues = ["FALSE", "0", "NO", "NE"];

(async function () {
  let content = await fs.readFile(`./grenais.csv`, "utf-8");

  // Parse the CSV content
  const records = parse(content);

  //HEADER
  //NUMERO,,Placar,TIME_MANDANTE,PLACAR_MANDANTE,GOLS_MANDANTE,GOLS_PENALTI_MANDANTE,PLACAR2,TIME_VISITANTE,PLACAR_VISITANTE,GOLS_VISITANTE,GOLS_PENALTI_VISITANTE,RODADA,PUBLICO,CAMPEONATO_ID,CAMPEONATO_DESCRICAO,ESTADIO,SEM_TORCIDA,Gols,OBS,OBS2,

  //This is not a mapping for the CSV
  const tableAttributes = [
    {
      name: "idChampionship",
      active: true,
      column: "ANO_CAMPEONATO",
      dataType: "string",
    },
    {
      name: "idRound",
      active: true,
      column: "RODADA",
    },
    {
      name: "idStadium",
      active: true,
      column: "ESTADIO",
    },
    {
      name: "attendance",
      active: true,
      column: "PUBLICO",
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
      name: "penaltiesScoreTeamHome",
      active: true,
      column: "GOLS_PENALTI_MANDANTE",
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
      name: "penaltiesScoreTeamAway",
      active: true,
      column: "GOLS_PENALTI_VISITANTE",
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
  var stadiumsNotFound = [];
  var roundsNotFound = [];

  records.slice(1).forEach((record) => {
    // Convert columns from record to a object with named attributes
    // HERE US THE MAPPING FOR CSV
    let gameCsvRecords = createGameCsvRecords(record);

    let roundId = "null"; //Stadium can be null if not found
    console.log(gameCsvRecords.RODADA);
    championshipRoundsIds.forEach((round) => {
      if (round.synonymous.includes(gameCsvRecords.RODADA)) {
        roundId = round.id;
      }
    });

    if (roundId === "null" && gameCsvRecords.RODADA.trim() !== "")
      roundsNotFound.push(gameCsvRecords.RODADA.trim());

    gameCsvRecords.RODADA = roundId;

    let stadiumId = "null"; //Stadium can be null if not found
    stadiumsIds.forEach((stadium) => {
      if (stadium.synonymous.includes(gameCsvRecords.ESTADIO.trim())) {
        stadiumId = stadium.id;
      }
    });

    if (stadiumId === "null" && gameCsvRecords.ESTADIO.trim() !== "")
      stadiumsNotFound.push(gameCsvRecords.ESTADIO.trim());

    gameCsvRecords.ESTADIO = stadiumId;

    // gameCsvRecords.ANO_CAMPEONATO = getChampionshipId(
    //   gameCsvRecords.ANO_CAMPEONATO
    // );

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

    if (gameCsvRecords.GOLS_VISITANTE.length === 0)
      gameCsvRecords.GOLS_VISITANTE = "null";
    if (gameCsvRecords.GOLS_MANDANTE.length === 0)
      gameCsvRecords.GOLS_MANDANTE = "null";
    if (gameCsvRecords.PUBLICO.length === 0) gameCsvRecords.PUBLICO = "null";

    if (gameCsvRecords.GOLS_PENALTI_VISITANTE.length === 0)
      gameCsvRecords.GOLS_PENALTI_VISITANTE = "null";
    if (gameCsvRecords.GOLS_PENALTI_MANDANTE.length === 0)
      gameCsvRecords.GOLS_PENALTI_MANDANTE = "null";

    let line = "INSERT INTO gameStaging (";
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
    `./grenais/output/database_insert.txt`,
    scriptLines.join("\n"),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  if (stadiumsNotFound.length > 0) {
    console.log("Stadiums not found:");
    stadiumsNotFound.forEach((stadium) => console.log(stadium));
  }
})();
