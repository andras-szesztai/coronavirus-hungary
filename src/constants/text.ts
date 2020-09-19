

export const EXPLAIN:  {[index:string] : {en: string; hu: string}}  = {
  cumulative: {
    en:
      "The cumulative number of deaths is calculated by accumulating all deaths over time since the first deceased.",
    hu:
      "Az elhunytak számának alakulása az elsõ esettõl kezdve akkumuláltan (tehát az összes elhunyt száma az adott napig bezárólag).",
  },
  daily: {
    en:
      "The 7 day (selected day and 6 previous days) moving average of daily deaths. Calculated: (1+2+3+4+5+6+7)/7 = 4 daily deaths on average over the last week.",
    hu:
      "A napi halálesetek alakulása 7 napos mozgóátlag (adott nap és az azt megelõzõ 6 nap) alapján. Számítása: (1+2+3+4+5+6+7)/7 = 4 átlag haláleset naponta az elmúlt egy héten.",
  },
  age: {
    en:
      "The average age of the deceased is calculated daily by summing up the age of each person passed away then dividing the number by the total number of deaths (or per gender).",
    hu:
      "Az átlagéletkor megállapításához napi szintent összeadjuk az összes addig elhunyt személy átlagéletkorát, majd a eredményt elosztjuk az elhalálozott személyek számával (kombinált vagy nem szerinti).",
  },
  ratio: {
    en:
      "In order to calculate gender ratio, for each date in the dataset we sum up the number of deaths by gender (took place until that day inclusive) and divide that with the total number of deceased.",
    hu:
      "A nemek megoszlási arányának kiszámításához napi szinten összeadjuk az addig elhunyt személyek számát nemenként, majd pedig az eredményt elosztjuk az összes (kombinált) elhalálozott számával.",
  },
}