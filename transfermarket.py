import basedosdados as bd

# Para carregar o dado direto no pandas
df = bd.read_table(dataset_id='mundo_transfermarkt_competicoes',
table_id='brasileirao_serie_a',
billing_project_id="basedosdados-downloader")

for game in df:
    print(game)
    break