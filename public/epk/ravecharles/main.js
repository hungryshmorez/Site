const RAW_EVENTS = [
  // 2014
  {
    date: "2014-04-21",
    title: "Tech N9ne, Freddie Gibbs, Jarren Benton",
    venue: "",
    city: "Raleigh",
    state: "NC"
  },
  {
    date: "2014-05-17",
    title: "Mission Underground Los Angeles - TeamBackPack",
    venue: "",
    city: "Los Angeles",
    state: "CA"
  },
  {
    date: "2014-06-06",
    title: "Tremont Music Hall",
    venue: "Tremont Music Hall",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2014-07-27",
    title: "Big B",
    venue: "Tremont Music Hall",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2014-08-23",
    title: "",
    venue: "Tremont Music Hall",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2014-11-30",
    title: "",
    venue: "Tremont Music Hall",
    city: "Charlotte",
    state: "NC"
  },

  // 2015
  {
    date: "2015-04-10",
    title: "",
    venue: "Tremont Music Hall",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2015-04-20",
    title: "",
    venue: "Tremont Music Hall",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2015-06-14",
    title: "Super Duper Kyle",
    venue: "Neighborhood Theatre",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2015-07-25",
    title: "Blind Fury, Whitney Peyton",
    venue: "Tremont Music Hall",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2015-08-03",
    title: "",
    venue: "Tremont Music Hall",
    city: "Charlotte",
    state: "NC"
  },
  // Transformus 2015 – multi‑day
  {
    date: "2015-08-13",
    title: "Transformus",
    venue: "Deerfields",
    city: "",
    state: "NC"
  },
  {
    date: "2015-08-14",
    title: "Transformus",
    venue: "Deerfields",
    city: "",
    state: "NC"
  },
  {
    date: "2015-08-15",
    title: "Transformus",
    venue: "Deerfields",
    city: "",
    state: "NC"
  },
  {
    date: "2015-08-16",
    title: "Transformus",
    venue: "Deerfields",
    city: "",
    state: "NC"
  },
  {
    date: "2015-09-11",
    title: "GFW - Yookie",
    venue: "Label",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2015-11-06",
    title: "Dreams Carnival",
    venue: "Chop Shop",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2015-11-21",
    title: "Jantsen B2B Dirt Monkey",
    venue: "Rabbit Hole",
    city: "Charlotte",
    state: "NC"
  },

  // 2016
  {
    date: "2016-01-16",
    title: "Manic Focus",
    venue: "Visualite Theatre",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2016-06-14",
    title: "Barrelled",
    venue: "Barrelled",
    city: "Charlotte",
    state: "NC"
  },

  // Cryptic Wisdom - ONE TAKE TAKEOVER TOUR 2016
  {
    date: "2016-09-24",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Fresno",
    state: "CA"
  },
  {
    date: "2016-10-01",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Salt Lake City",
    state: "UT"
  },
  {
    date: "2016-10-02",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Ogden",
    state: "UT"
  },
  {
    date: "2016-10-05",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Greeley",
    state: "CO"
  },
  {
    date: "2016-10-06",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Rifle",
    state: "CO"
  },
  {
    date: "2016-10-07",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Denver",
    state: "CO"
  },
  {
    date: "2016-10-08",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Grand Junction",
    state: "CO"
  },
  {
    date: "2016-10-09",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Colorado Springs",
    state: "CO"
  },
  {
    date: "2016-10-10",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Tulsa",
    state: "OK"
  },
  {
    date: "2016-10-11",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Merriam",
    state: "KS"
  },
  {
    date: "2016-10-12",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Warrensburg",
    state: "MO"
  },
  {
    date: "2016-10-13",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "St. Louis",
    state: "MO"
  },
  {
    date: "2016-10-14",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Watertown",
    state: "WI"
  },
  {
    date: "2016-10-15",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Allen Park",
    state: "MI"
  },
  {
    date: "2016-10-16",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Joliet",
    state: "IL"
  },
  {
    date: "2016-10-17",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Columbus",
    state: "OH"
  },
  {
    date: "2016-10-18",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "South Bend",
    state: "IN"
  },
  {
    date: "2016-10-19",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Akron",
    state: "OH"
  },
  {
    date: "2016-10-20",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Reading",
    state: "PA"
  },
  {
    date: "2016-10-21",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Virginia Beach",
    state: "VA"
  },
  {
    date: "2016-10-22",
    title: "Cryptic Wisdom - ONE TAKE TAKEOVER TOUR",
    venue: "",
    city: "Greensboro",
    state: "NC"
  },
  {
    date: "2016-11-21",
    title: "Barrelled",
    venue: "Barrelled",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2016-12-17",
    title: "Bass4Bratz",
    venue: "Serj",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2016-12-21",
    title: "Spent Secret Santa",
    venue: "Barrelled",
    city: "Charlotte",
    state: "NC"
  },

  // 2017
  {
    date: "2017-01-14",
    title: "GFW",
    venue: "Suite",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-01-27",
    title: "Mad Hatters Ball",
    venue: "Serj",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-03-04",
    title: "Green Eggs & Fam",
    venue: "Secret Location",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-03-18",
    title: "Space Jesus / Luzcid",
    venue: "",
    city: "Greenville",
    state: "SC"
  },
  {
    date: "2017-05-28",
    title: "Spent Block Party",
    venue: "The Trap",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-06-15",
    title: "Vibes at Vine",
    venue: "",
    city: "Greenville",
    state: "SC"
  },
  {
    date: "2017-06-16",
    title: "SERJ",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-06-20",
    title: "SubLosa",
    venue: "",
    city: "Raleigh",
    state: "NC"
  },
  {
    date: "2017-07-07",
    title: "Warped Tour",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-08-03",
    title: "Charlotte Basshead Meet Up",
    venue: "Studio Movie Grill",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-09-09",
    title: "Crowell",
    venue: "",
    city: "Salisbury",
    state: "NC"
  },
  {
    date: "2017-09-15",
    title: "Kill The Noise / Slump / Ray Volpe",
    venue: "Neighborhood Theatre",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-09-16",
    title: "GFW",
    venue: "Bassment",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-10-13",
    title: "Awakening Festival",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-10-13",
    title: "Beardthug",
    venue: "Asheville Music Hall",
    city: "Asheville",
    state: "NC"
  },
  {
    date: "2017-10-15",
    title: "Kosha Dillz",
    venue: "The Milestone",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-10-27",
    title: "Wicked Halloween",
    venue: "Purple Buffalo",
    city: "Charleston",
    state: "SC"
  },
  {
    date: "2017-11-03",
    title: "SERJ",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-11-17",
    title: "Rick and Morty Rave",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-12-08",
    title: "Psymbionic / Marvel Years",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-12-09",
    title: "SERJ",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2017-12-30",
    title: "Hippie Sabotage",
    venue: "The Fillmore",
    city: "Charlotte",
    state: "NC"
  },

  // 2018
  {
    date: "2018-01-06",
    title: "Charlotte Basshead Meet Up",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-02-10",
    title: "Charlotte Basshead Meet Up",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-02-16",
    title: "Blunts and Blondes",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-02-24",
    title: "HEYZ",
    venue: "Bassment",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-03-03",
    title: "QueenCity Flava",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-03-16",
    title: "Rick & Morty Rave",
    venue: "Asheville Music Hall",
    city: "Asheville",
    state: "NC"
  },
  {
    date: "2018-03-17",
    title: "Harry Potter Rave",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-04-07",
    title: "SERJ",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-04-20",
    title: "DIGITAL GARDENS",
    venue: "The Shed",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-04-21",
    title: "DIGITAL GARDENS",
    venue: "The Shed",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-04-27",
    title: "Charlotte Basshead Meet Up",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-05-04",
    title: "Run DMT",
    venue: "Blind Tiger",
    city: "Greensboro",
    state: "NC"
  },
  {
    date: "2018-05-10",
    title: "After Party",
    venue: "World Nightclub",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-05-11",
    title: "Rick & Morty Rave",
    venue: "Asheville Music Hall",
    city: "Asheville",
    state: "NC"
  },
  {
    date: "2018-05-23",
    title: "Somewhere Else Tavern",
    venue: "Somewhere Else Tavern",
    city: "Greensboro",
    state: "NC"
  },
  {
    date: "2018-05-26",
    title: "BBQ Beats",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-05-26",
    title: "Charlotte Basshead Meet Up",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-06-02",
    title: "DJ Dara",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  // Neon Music Festival 2018 – multi‑day
  {
    date: "2018-06-08",
    title: "Neon Music Festival",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-06-09",
    title: "Neon Music Festival",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-06-10",
    title: "Neon Music Festival",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-06-16",
    title: "Connected",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-07-21",
    title: "The Milestone",
    venue: "The Milestone",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-07-27",
    title: "Charlotte Basshead Meet Up - illanthropy",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-08-10",
    title: "World Nightclub",
    venue: "World Nightclub",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-08-11",
    title: "Pneaumatron Fest",
    venue: "Tranquility Base Camp",
    city: "",
    state: "NC"
  },
  {
    date: "2018-08-24",
    title: "Connected",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-09-08",
    title: "Mindset",
    venue: "Blind Tiger",
    city: "Greensboro",
    state: "NC"
  },
  {
    date: "2018-10-12",
    title: "Breakaway Music Festival",
    venue: "Music Factory",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-10-12",
    title: "Griz / Shooka / Muzzy Bear - After Party",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-10-13",
    title: "Breakaway Music Festival",
    venue: "Music Factory",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-10-13",
    title: "After Party",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-10-19",
    title: "Charlotte Basshead Meet Up - Slave",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-10-27",
    title: "The Upside Down",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-10-31",
    title: "The Happening",
    venue: "Oso Skate Park",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-11-03",
    title: "State of Mind / Jade / Mob Tactics",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-11-16",
    title: "The Wormhole",
    venue: "The Wormhole",
    city: "Savannah",
    state: "GA"
  },
  {
    date: "2018-11-30",
    title: "Salty - Cattzly",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-12-21",
    title: "Peculiar Rabbit",
    venue: "Peculiar Rabbit",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2018-12-22",
    title: "Bass4Bratz",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },

  // 2019
  {
    date: "2019-01-05",
    title: "SERJ",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-01-11",
    title: "Tvboo / Ravenscoon",
    venue: "Blind Tiger",
    city: "Greensboro",
    state: "NC"
  },
  {
    date: "2019-01-26",
    title: "DJ Hippo",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-02-02",
    title: "Basshead Meet Up",
    venue: "Purple Buffalo",
    city: "Charleston",
    state: "SC"
  },
  {
    date: "2019-02-08",
    title: "Raveology",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-02-16",
    title: "EuroTech",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-02-24",
    title: "Charlotte Basshead Meet Up",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-02-25",
    title: "Warehouse Party",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-03-09",
    title: "SERJ",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-03-30",
    title: "SERJ",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-04-10",
    title: "Gspace / Laika Beats",
    venue: "Purple Buffalo",
    city: "Charleston",
    state: "SC"
  },
  {
    date: "2019-04-12",
    title: "Gspace / Laika Beats",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-04-13",
    title: "Partial Nerdity",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-04-19",
    title: "DIGITAL GARDENS",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-04-20",
    title: "DIGITAL GARDENS",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-05-08",
    title: "Insane Clown Posse / Rittz / MushroomHead / DJ Paul",
    venue: "Hooligans",
    city: "Jacksonville",
    state: "NC"
  },
  {
    date: "2019-05-10",
    title: "Connected",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-05-11",
    title: "Charlestoned",
    venue: "Purple Buffalo",
    city: "Charleston",
    state: "SC"
  },
  {
    date: "2019-05-16",
    title: "Wavecraft",
    venue: "The Firmament",
    city: "Greenville",
    state: "SC"
  },
  {
    date: "2019-05-18",
    title: "Eurotech",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-05-31",
    title: "Arcade of Thrones",
    venue: "",
    city: "Raleigh",
    state: "NC"
  },
  {
    date: "2019-06-12",
    title: "Esham",
    venue: "The Milestone",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-06-15",
    title: "Wildlife",
    venue: "The Outpost",
    city: "Raleigh",
    state: "NC"
  },
  {
    date: "2019-06-22",
    title: "Partial Nerdity",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-07-06",
    title: "Squad Goals",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-07-12",
    title: "Futexture",
    venue: "Blind Tiger",
    city: "Greensboro",
    state: "NC"
  },
  {
    date: "2019-07-13",
    title: "Devin The Dude",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-07-26",
    title: "Tvboo / Leet",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-08-09",
    title: "Drop Doc",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-08-30",
    title: "Pursuit of Happiness",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-09-04",
    title: "Slander & Nghtmre After Party - DrinkUrWater",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-09-14",
    title: "Partial Nerdity",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-09-27",
    title: "WONDERLUST",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-09-28",
    title: "WONDERLUST",
    venue: "",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-09-29",
    title: "Road to Breakaway - Charleston",
    venue: "Good People",
    city: "Charleston",
    state: "SC"
  },
  {
    date: "2019-10-04",
    title: "Breakaway Music Festival",
    venue: "Music Factory",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-10-05",
    title: "Breakaway Music Festival",
    venue: "Music Factory",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-10-12",
    title: "Kung Fu Vampire",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-10-19",
    title: "Eurotech",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-11-09",
    title: "CLT Basshead Meet Up",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-11-13",
    title: "Dan Deacon",
    venue: "Neighborhood Theatre",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-12-06",
    title: "Nugz Bunny - CLT Basshead Meet Up",
    venue: "Crown Station",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-12-12",
    title: "Nghtmre After Party",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-12-21",
    title: "Vctre / Houman / Mindset",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2019-12-31",
    title: "Hippie Sabotage / Crywolf / Megan Hamilton",
    venue: "The Fillmore",
    city: "Charlotte",
    state: "NC"
  },

  // 2020
  {
    date: "2020-01-01",
    title: "Future Pixels New Year's Eve - Black Carl! / Rest in Pierce",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2020-01-03",
    title: "Neighborhood Love",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2020-01-24",
    title: "Gdubz",
    venue: "Brooklyn Lounge",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2020-02-01",
    title: "Bass Planet",
    venue: "Dubsonics",
    city: "Wilmington",
    state: "NC"
  },
  {
    date: "2020-02-06",
    title: "illanthropy",
    venue: "Clutch Kitchen",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2020-02-07",
    title: "Cancel / Noizon",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2020-02-22",
    title: "Eurotech Birthday Set",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },

  // TRIPZY LEARY Cyberspace 2020 Southeast Tour
  {
    date: "2020-02-28",
    title: "TRIPZY LEARY Cyberspace 2020 Southeast Tour",
    venue: "The Boiler Room",
    city: "Asheville",
    state: "NC"
  },
  {
    date: "2020-02-29",
    title: "TRIPZY LEARY Cyberspace 2020 Southeast Tour",
    venue: "Vision Studios",
    city: "Atlanta",
    state: "GA"
  },
  {
    date: "2020-03-01",
    title: "TRIPZY LEARY Cyberspace 2020 Southeast Tour",
    venue: "",
    city: "Charleston",
    state: "SC"
  },
  {
    date: "2020-03-02",
    title: "TRIPZY LEARY Cyberspace 2020 Southeast Tour",
    venue: "Gilt Nightclub",
    city: "Orlando",
    state: "FL"
  },
  {
    date: "2020-03-03",
    title: "TRIPZY LEARY Cyberspace 2020 Southeast Tour",
    venue: "The Wormhole",
    city: "Savannah",
    state: "GA"
  },
  {
    date: "2020-03-04",
    title: "TRIPZY LEARY Cyberspace 2020 Southeast Tour",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2020-03-12",
    title: "Prophet / Angelic Root",
    venue: "SERJ",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2020-03-13",
    title: "An Evening With Rave Charles",
    venue: "Brooklyn Lounge",
    city: "Charlotte",
    state: "NC"
  },
  {
    date: "2020-10-31",
    title: "Eurotech - Noda Block Party",
    venue: "",
    city: "Charlotte",
    state: "NC"
  }
];

function buildData(raw) {
  const enriched = raw
    .map((e) => {
      const d = new Date(e.date);
      const ye = d.getFullYear();
      const month = d.toLocaleString("default", { month: "short" });
      const day = String(d.getDate()).padStart(2, "0");
      const city =
        (e.city || "").trim() +
        (e.state ? (e.city ? ", " : "") + e.state : "");
      const labelPieces = [];
      if (e.venue) labelPieces.push(e.venue);
      if (city) labelPieces.push(city);
      const label = labelPieces.join(" • ");

      return {
        ...e,
        year: ye,
        dateObj: d,
        dateLabel: `${month} ${day}`,
        cityLabel: city,
        subtitle: label
      };
    })
    .sort((a, b) => a.dateObj - b.dateObj);

  const years = [...new Set(enriched.map((e) => e.year))];
  const byYear = years.reduce((acc, y) => {
    acc[y] = enriched.filter((e) => e.year === y);
    return acc;
  }, {});

  return { events: enriched, years, byYear };
}

const DATA = buildData(RAW_EVENTS);

const els = {
  yearStrip: document.getElementById("year-strip"),
  eventsList: document.getElementById("events-list"),
  metaYear: document.getElementById("meta-year"),
  metaCount: document.getElementById("meta-count"),
  cityFilter: document.getElementById("city-filter"),
  summaryToggle: document.getElementById("summary-toggle"),
  sheet: document.getElementById("bottom-sheet"),
  sheetBackdrop: document.getElementById("sheet-backdrop"),
  sheetClose: document.getElementById("sheet-close")
};

let state = {
  year: DATA.years[0] || null,
  cityFilter: "all"
};

function renderYearChips() {
  els.yearStrip.innerHTML = "";
  DATA.years.forEach((year) => {
    const count = DATA.byYear[year].length;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "year-chip" + (year === state.year ? " year-chip--active" : "");
    btn.dataset.year = String(year);
    btn.setAttribute("aria-pressed", String(year === state.year));
    btn.innerHTML = `<span>${year}</span><span class="year-chip-count">${count}</span>`;
    els.yearStrip.appendChild(btn);
  });
}

function getFilteredEvents() {
  const all = DATA.byYear[state.year] || [];
  if (state.cityFilter === "all") return all;
  return all.filter((e) => e.cityLabel === state.cityFilter);
}

function populateCityFilter() {
  const allForYear = DATA.byYear[state.year] || [];
  const cities = [...new Set(allForYear.map((e) => e.cityLabel).filter(Boolean))];
  els.cityFilter.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "all";
  optAll.textContent = "All cities";
  els.cityFilter.appendChild(optAll);
  cities.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    els.cityFilter.appendChild(opt);
  });
  state.cityFilter = "all";
}

function renderEvents() {
  const events = getFilteredEvents();
  els.eventsList.innerHTML = "";
  els.metaYear.textContent = state.year ? String(state.year) : "—";
  els.metaCount.textContent = String(events.length);

  if (!events.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No events for this filter.";
    els.eventsList.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  events.forEach((e) => {
    const row = document.createElement("div");
    row.className = "event-row";
    row.setAttribute("role", "listitem");

    const dateEl = document.createElement("div");
    dateEl.className = "event-date";
    dateEl.textContent = e.dateLabel;

    const mainEl = document.createElement("div");
    mainEl.className = "event-main";
    mainEl.textContent = e.title || e.venue || "Live set";

    const venueEl = document.createElement("div");
    venueEl.className = "event-venue";
    venueEl.textContent = e.subtitle || e.cityLabel;

    const metaEl = document.createElement("div");
    metaEl.className = "event-meta";
    metaEl.textContent = e.cityLabel || "";

    row.appendChild(dateEl);
    row.appendChild(mainEl);
    row.appendChild(venueEl);
    if (metaEl.textContent) row.appendChild(metaEl);

    fragment.appendChild(row);
  });

  els.eventsList.appendChild(fragment);
}

function setYear(year) {
  if (state.year === year) return;
  state.year = year;
  populateCityFilter();
  renderYearChips();
  renderEvents();
}

function initYearStripEvents() {
  els.yearStrip.addEventListener("click", (ev) => {
    const target = ev.target.closest(".year-chip");
    if (!target) return;
    const year = parseInt(target.dataset.year, 10);
    if (!Number.isNaN(year)) setYear(year);
  });
}

function initCityFilter() {
  els.cityFilter.addEventListener("change", () => {
    state.cityFilter = els.cityFilter.value;
    renderEvents();
  });
}

/* Bottom sheet */

function openSheet() {
  els.sheet.setAttribute("aria-hidden", "false");
  els.sheetBackdrop.classList.add("sheet-backdrop--visible");
  els.summaryToggle.setAttribute("aria-expanded", "true");
}

function closeSheet() {
  els.sheet.setAttribute("aria-hidden", "true");
  els.sheetBackdrop.classList.remove("sheet-backdrop--visible");
  els.summaryToggle.setAttribute("aria-expanded", "false");
}

function initSheet() {
  els.summaryToggle.addEventListener("click", openSheet);
  els.sheetBackdrop.addEventListener("click", closeSheet);
  els.sheetClose.addEventListener("click", closeSheet);
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && els.sheet.getAttribute("aria-hidden") === "false") {
      closeSheet();
    }
  });
}

/* Init */

function init() {
  if (!state.year && DATA.years.length) {
    state.year = DATA.years[0];
  }
  renderYearChips();
  populateCityFilter();
  renderEvents();
  initYearStripEvents();
  initCityFilter();
  initSheet();
}

document.addEventListener("DOMContentLoaded", init);
