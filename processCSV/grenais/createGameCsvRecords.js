//NUMERO,DATA,Placar,TIME_MANDANTE,PLACAR_MANDANTE,GOLS_MANDANTE,GOLS_PENALTI_MANDANTE,PLACAR2,TIME_VISITANTE,PLACAR_VISITANTE,GOLS_VISITANTE,GOLS_PENALTI_VISITANTE,RODADA,PUBLICO,CAMPEONATO_ID,CAMPEONATO_DESCRICAO,ESTADIO,SEM_TORCIDA,Gols,OBS,OBS2,
const createGameCsvRecords = (record) => {
  let gameCsvRecords = {
    ANO_CAMPEONATO: record[14],
    DATA: record[1],
    RODADA: record[12],
    ESTADIO: record[16],
    PUBLICO: record[13],
    TIME_MANDANTE: record[3],
    TIME_VISITANTE: record[8],
    TECNICO_MANDANTE: null,
    TECNICO_VISITANTE: null,
    GOLS_MANDANTE: record[5],
    GOLS_VISITANTE: record[10],
    GOLS_PENALTI_MANDANTE: record[6],
    GOLS_PENALTI_VISITANTE: record[11],
  };
  return gameCsvRecords;
};

module.exports = { createGameCsvRecords };
