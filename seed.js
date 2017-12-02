var Promise = require('bluebird')

var {
  Aircraft,
  Country
} = require('./server/db/models')

var db = require('./server/db/_db')

var data = {
  aircraft: [
    {
      make: 'Lockheed',
      model: 'Electra',
      year: 1934,
      type: 'Versatile',
      imageUrl: 'https://static.thisdayinaviation.com/wp-content/uploads/tdia//2013/06/Lockheed-Electra-10E-NR16020-by-F.X.-OGrady-1937.jpg',
      description: 'The Lockheed Model 10 Electra is an American twin-engine, all-metal monoplane airliner developed by the Lockheed Aircraft Corporation in the 1930s to compete with the Boeing 247 and Douglas DC-2. The type gained considerable fame as one was flown by Amelia Earhart on her ill-fated around-the-world expedition in 1937.'
    },
    {
      make: 'Lockheed',
      model: 'Vega',
      year: 1927,
      type: 'Transport',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Lockheed_Vega_5b_Smithsonian.jpg',
      description: 'The Lockheed Vega is an American six-passenger high-wing monoplane airliner built by the Lockheed Corporation starting in 1927. It became famous for its use by a number of record-breaking pilots who were attracted to the rugged and very long-range design. Amelia Earhart became the first woman to fly the Atlantic single-handed in one, and Wiley Post used his to prove the existence of the jet stream after having flown around the world twice.'
    },
    {
      make: 'Lockheed',
      model: 'P-2 Neptune',
      year: 1945,
      type: 'Reconoissance',
      imageUrl: 'https://en.wikipedia.org/wiki/Lockheed_P-2_Neptune#/media/File:P-2H_VP-56_1963.jpg',
      description: 'The Lockheed P-2 Neptune (designated P2V by the United States Navy prior to September 1962) was a Maritime patrol and anti-submarine warfare (ASW) aircraft. It was developed for the US Navy by Lockheed to replace the Lockheed PV-1 Ventura and PV-2 Harpoon, and was replaced in turn by the Lockheed P-3 Orion. Designed as a land-based aircraft, the Neptune never made a carrier landing, although a small number of aircraft were converted and deployed as carrier-launched, stop-gap nuclear bombers which would have to ditch or recover at land bases. The type was successful in export and saw service with several armed forces.'
    },
    {
      make: 'Boeing',
      model: 'B-52 Stratofortress',
      year: 1952,
      type: 'Bomber',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/USAF_B-52_participating_in_RIMPAC_2010.jpg/1200px-USAF_B-52_participating_in_RIMPAC_2010.jpg',
      description: 'The Boeing B-52 Stratofortress is an American long-range, subsonic, jet-powered strategic bomber. The B-52 was designed and built by Boeing, which has continued to provide support and upgrades. It has been operated by the United States Air Force (USAF) since the 1950s. The bomber is capable of carrying up to 70,000 pounds (32,000 kg) of weapons,[5] and has a typical combat range of more than 8,800 miles (14,080 km) without aerial refueling.'
    },
    {
      make: 'Boeing',
      model: 'YB-9',
      year: 1931,
      type: 'Bomber',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Boeing_Y1B-9_test_flight_USAF_p29.jpg/1200px-Boeing_Y1B-9_test_flight_USAF_p29.jpg',
      description: `The Boeing YB-9 was the first all-metal monoplane bomber aircraft designed for the United States Army Air Corps. The YB-9 was an enlarged alteration of Boeing's Model 200 Commercial Transport.`
    },
    {
      make: 'Northrop',
      model: 'F-5',
      year: 1959,
      type: 'Attack',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chile_Air_Force_Northrop_F-5E_Tigre_III_Lofting-1.jpg',
      description: `The Northrop F-5A and F-5B Freedom Fighter and the F-5E and F-5F Tiger II are part of a supersonic light fighter family, initially designed in the late 1950s by Northrop Corporation. Being smaller and simpler than contemporaries such as the McDonnell Douglas F-4 Phantom II, the F-5 cost less to both procure and operate, making it a popular export aircraft. The F-5 started life as a privately funded light fighter program by Northrop in the 1950s. The design team wrapped a small, highly aerodynamic fighter around two compact and high-thrust General Electric J85 engines, focusing on performance and low cost of maintenance. Though primarily designed for the day air superiority role, the aircraft is also a capable ground-attack platform. The F-5A entered service in the early 1960s. During the Cold War, over 800 were produced through 1972 for U.S. allies. Though the USAF had no acknowledged need for a light fighter, it did procure roughly 1,200 Northrop T-38 Talon trainer aircraft, which were directly based on the F-5A.`
    },
    {
      make: 'Saab', // Sweden
      model: '37 Viggen',
      year: 1967,
      type: 'Attack',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Saab_37_Viggen_37301_001.jpg',
      description: `The Saab 37 Viggen ("Thunderbolt")[Nb 1][3] is a retired Swedish single-seat, single-engine, short-medium range combat aircraft. Development work on the type was initiated at Saab in 1952 and, following the selection of a radical delta wing configuration, the resulting aircraft performed its first flight on 8 February 1967 and entered service in 21 June 1971. The Viggen holds the distinction of being the first canard design to be produced in quantity.[4]`
    },
    {
      make: 'Aero', // Czechoslovakia
      model: 'A.11',
      year: 1925,
      type: 'Reconoissance',
      imageUrl: 'http://www.leteckabadatelna.cz/uploads/P%C5%99edv%C3%A1le%C4%8Dn%C3%A9/A-11%20Troubelice/AB%20111%20Brand%C3%BDs/12081701AAA.jpg',
      description: `The Aero A.11 was a biplane light bomber and reconnaissance aircraft built in Czechoslovakia between the First and Second World Wars. It formed the basis for a large number of other Czechoslovakian military aircraft of the inter-war period. Around 250 were built, with some remaining in service at the outbreak of World War II.`
    },
    {
      make: 'Bristol', // United Kingdom
      model: 'Belvedere',
      year: 1958,
      type: 'Transport',
      imageUrl: 'http://www.leteckabadatelna.cz/uploads/P%C5%99edv%C3%A1le%C4%8Dn%C3%A9/A-11%20Troubelice/AB%20111%20Brand%C3%BDs/12081701AAA.jpg',
      description: `The Bristol Type 192 Belvedere was a British twin-engine, tandem rotor military helicopter built by the Bristol Aeroplane Company. It was designed by Raoul Hafner for a variety of transport roles including troop transport, supply dropping and casualty evacuation. It was operated by the Royal Air Force (RAF) from 1961 to 1969. The Belvedere was Britain's only tandem rotor helicopter to enter production, and one of the few not built by Boeing or Piasecki.`
    },
    {
      make: 'Blackburn', // UK
      model: 'Buccaneer',
      year: 1958,
      type: 'Attack',
      imageUrl: 'https://i.pinimg.com/originals/e7/57/bd/e757bddf27507f5dd964b6f2a13b6340.jpg',
      description: `The Blackburn Buccaneer was a British carrier-borne attack aircraft designed in the 1950s for the Royal Navy (RN). Designed and initially produced by Blackburn Aircraft at Brough, it was later officially known as the Hawker Siddeley Buccaneer when Blackburn became a part of the Hawker Siddeley Group, but this name is rarely used.`
    }
  ],
  country: [
    {
      name: 'United States',
      GFI: 0,
      flagUrl: ''
    },
    {
      name: 'United Kingdom',
      GFI: 0,
      flagUrl: ''
    },
    {
      name: 'Sweden',
      GFI: 0,
      flagUrl: ''
    },
    {
      name: 'Czechoslovakia',
      GFI: 0,
      flagUrl: ''
    }
  ]
};

db
  .sync({force: true})
  .then(function() {
    console.log("Old data dropped, and new data inserted");
    return Promise.map(Object.keys(data), function(name) {
      return Promise.map(data[name], function(item) {
        return db.model(name).create(item);
      });
    });
  })
  .then(function() {
    console.log("Finished inserting data");
  })
  .catch(function(err) {
    console.error("there was a problem", err, err.stack);
  })
  .finally(function() {
    db.close();
    console.log("connection closed");
    return null; // silences bluebird warning about using non-returned promises inside of handlers
  });