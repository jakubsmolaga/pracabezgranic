const industry = {
  0: "Wszystkie branże",
  1: "Architektura, budownictwo",
  2: "Biotechnologia",
  3: "Chemia",
  4: "Doradztwo, consulting",
  5: "Edukacja, szkolenia",
  6: "Ekologia, energie odnawialne",
  7: "Elektronika, elektrotechnika",
  8: "Finanse, ubezpieczenia",
  9: "Gastronomia",
  10: "Handel hurtowy i detaliczny",
  11: "Informatyka, IT, internet",
  12: "Marketing, reklama",
  13: "Media",
  14: "Medycyna, farmacja",
  15: "Motoryzacja",
  16: "Nieruchomości",
  17: "Ochrona środowiska",
  18: "Paliwa, energia, gaz",
  19: "Produkcja - inne",
  20: "Rolnictwo",
  21: "Rozrywka, kultura, sport",
  22: "Sprzęt, maszyny, urządzenia",
  23: "Transport, spedycja, logistyka",
  24: "Turystyka, hotele",
  25: "Usługi - inne",
  26: "Inna branża"
};
const workTime = {
  0: 'Dowolny Wymiar',
  1: 'Pełny Etat',
  2: 'Część Etatu',
  3: 'Praca Czasowa',
  4: 'Kontrakt'
};

const cities = ["Aleksandrów Łódzki", "Andrychów", "Arłamów", "Augustów", "Barcin", "Barlinek", "Bartoszyce", "Bełchatów", "Biała Podlaska", "Białe Błota", "Białka Tatrzańska", "Białowieża", "Białystok", "Bielsko-Biała", "Bieruń", "Biskupiec", "Bochnia", "Bogatynia", "Bolesławiec", "Boszkowo", "Braniewo", "Brodnica", "Brok", "Brzeg", "Brzeziny", "Budzyń", "Bukowina Tatrzańska", "Busko-Zdrój", "Bustryk", "Bydgoszcz", "Bytom", "Błonie", "Cekanowo", "Chałupy", "Chełm", "Chorzów", "Ciechanów", "Ciechocinek", "Cieszyn", "Czechowice-Dziedzice", "Czeladź", "Częstochowa", "Dąbki", "Dąbrowa Górnicza", "Darłowo", "Dobczyce", "Domasław", "Duszniki Zdrój", "Dzierżoniow", "Dziwnówek", "Dźwirzyno", "Elbląg", "Ełk", "Frombork", "Gdańsk", "Gdynia", "Gierłoż", "Giżycko", "Gliwice", "Gniezno", "Godkowo", "Gogolin", "Golub-Dobrzyń", "Goniądz", "Gorzów Wielkopolski", "Gołdap", "Grudziądz", "Grzybowo", "Głogów", "Hajnówka", "Hel", "Iwonicz Zdrój", "Jadwisin", "Janów Podlaski", "Jastarnia", "Jastrzębia Góra", "Jelenia Góra", "Jerzmanowice", "Józefów", "Jugowice", "Jurata", "Kadyny", "Kalisz", "Kalwaria Zebrzydowska", "Karpacz", "Kartuzy", "Katowice", "Kąty Wrocławskie", "Kazimierz Dolny", "Kętrzyn", "Kielce", "Kiermusy", "Kobiór", "Kobylnica", "Koleczkowo", "Komorniki", "Konstancin-Jeziorna", "Konstantynów Łódzki", "Korczyna", "Kościan", "Kościelisko", "Koszalin", "Kołbaskowo", "Kołobrzeg", "Krąg", "Kraków", "Krasnobród", "Kroczyce", "Krosno", "Krynica Morska", "Krynica-Zdrój", "Krzywaczka", "Książ Wielki", "Kudowa-Zdrój", "Kutno", "Kłodzko", "Lądek-Zdrój", "Legnica", "Leśna", "Lidzbark Warmiński", "Lipowa", "Lublin", "Lubliniec", "Malbork", "Michałowice", "Międzybrodzie Żywieckie", "Międzywodzie", "Międzyzdroje", "Mielec", "Mielno", "Mikołajki", "Milówka", "Mińsk Mazowiecki", "Morąg", "Mrągowo", "Mrzeżyno", "Mszana Dolna", "Mszczonów", "Murzasichle", "Muszyna", "Myczkowce", "Myślenice", "Nadarzyn", "Nałęczów", "Niechorze", "Nowe Brzesko", "Nowogród", "Nowy Sącz", "Nowy Targ", "Oborniki", "Ogonki", "Ogrodzieniec", "Okuninka", "Oleśnica", "Olsztyn", "Opalenica", "Opole", "Opole Lubelskie", "Osjaków", "Ostróda", "Ostrów Mazowiecka", "Ostrów Wielkopolski", "Ostrowiec Świetokrzyski", "Ostrołęka", "Oświęcim", "Ożarow Mazowiecki", "Oława", "Paszkówka", "Piekary Śląskie", "Piotrków Trybunalski", "Pisz", "Piła", "Pniewy", "Pobierowo", "Podgórzyn", "Polanica Zdrój", "Poręba Wielka", "Poronin", "Postołowo", "Poznań", "Pruszcz Gdański", "Pruszków", "Przemyśl", "Pszczyna", "Puck", "Puszczykowo", "Płock", "Rabka Zdrój", "Racibórz", "Racławice", "Radom", "Rawa Mazowiecka", "Reda", "Rowy", "Ruciane-Nida", "Rudnik", "Rumia", "Rybnik", "Rydzewo", "Rydzyna", "Rymanów", "Ryn", "Rzeszów", "Sandomierz", "Sanok", "Siedlce", "Siemianowice Śląskie", "Sieraków", "Siewierz", "Skawina", "Skierniewice", "Sochaczew", "Solec-Zdrój", "Sopot", "Sorkwity", "Sosnowiec", "Spała", "Stare Jabłonki", "Stargard Szczeciński", "Strzegowo", "Sulmierzyce", "Supraśl", "Suwałki", "Swarzędz", "Świdnica", "Świebodzin", "Świeradów-Zdrój", "Święta Lipka", "Świnoujście", "Szaflary", "Szczawnica", "Szczecin", "Szczyrk", "Szklarska Poręba", "Słupsk", "Tarnów", "Tczew", "Toruń", "Tresna", "Tryszczyn", "Trzebinia", "Trzebnica", "Trzęsacz", "Tychy", "Tłuszcz", "Uniejów", "Ustka", "Ustroń", "Ustronie Morskie", "Ustrzyki Dolne", "Wadowice", "Warszawa", "Wąsowo", "Wałbrzych", "Wejherowo", "Wetlina", "Wiejce", "Wieliczka", "Wierchomla Wielka", "Wisła", "Witów", "Woźniki", "Wrocław", "Wronki", "Władysławowo", "Włocławek", "Ząb", "Zabrze", "Zagórze Śląskie", "Zakopane", "Zakroczym", "Zamość", "Żary", "Zawiercie", "Zawoja", "Załuski", "Zblewo", "Zegrze", "Zgorzelec", "Zgłobice", "Zielona Góra", "Żory", "Żywiec", "Złockie", "Złotoryja", "Łagów", "Łeba", "Łódź", "Łomża", "Łukta", "Łysomice"];

module.exports = {industry, workTime, cities};
