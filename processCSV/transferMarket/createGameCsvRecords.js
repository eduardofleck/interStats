const createGameCsvRecords = (record, brasileiraoOrCopaDoBrasil) => {
  if (brasileiraoOrCopaDoBrasil === "BR") {
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
    return gameCsvRecords;
  } else if (brasileiraoOrCopaDoBrasil === "COPA") {
    let gameCsvRecords = {
      ANO_CAMPEONATO: record[0],
      DATA: record[1],
      RODADA: record[3],
      FASE: record[4],
      ESTADIO: record[5],
      ARBITRO: record[6],
      PUBLICO: record[7],
      PUBLICO_MAX: record[8],
      TIME_MANDANTE: record[9],
      TIME_VISITANTE: record[10],
      TECNICO_MANDANTE: record[11],
      TECNICO_VISITANTE: record[12],
      COLOCACAO_MANDANTE: null,
      COLOCACAO_VISITANTE: null,
      VALOR_EQUIPE_TITULAR_MANDANTE: record[13],
      VALOR_EQUIPE_TITULAR_VISITANTE: record[14],
      IDADE_MEDIA_TITULAR_MANDANTE: record[15],
      IDADE_MEDIA_TITULAR_VISITANTE: record[16],
      GOLS_MANDANTE: record[17],
      GOLS_VISITANTE: record[18],
      GOLS_1_TEMPO_MANDANTE: record[19],
      GOLS_1_TEMPO_VISITANTE: record[20],
      ESCANTEIOS_MANDANTE: record[24],
      ESCANTEIOS_VISITANTE: record[25],
      FALTAS_MANDANTE: record[26],
      FALTAS_VISITANTE: record[27],
      CHUTES_BOLA_PARADA_MANDANTE: record[28],
      CHUTES_BOLA_PARADA_VISITANTE: record[29],
      DEFESAS_MANDANTE: record[30],
      DEFESAS_VISITANTE: record[31],
      IMPEDIMENTOS_MANDANTE: record[32],
      IMPEDIMENTOS_VISITANTE: record[33],
      CHUTES_MANDANTE: record[34],
      CHUTES_VISITANTE: record[35],
      CHUTES_FORA_MANDANTE: record[36],
      CHUTES_FORA_VISITANTE: record[37],
    };
    return gameCsvRecords;
  }
};

module.exports = { createGameCsvRecords };