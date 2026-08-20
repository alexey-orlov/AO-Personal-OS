# -*- coding: utf-8 -*-
"""
Backbone place list for the Bay Area relocation ranking.

Coverage rule (stated in the deliverable's methodology):
  * SF: all 41 SF Planning "Analysis Neighborhoods" -- the official, exhaustive,
    non-overlapping taxonomy. It is also the geography SFPD incident data and
    DPH/ACS neighborhood profiles are published on, which makes the crime and
    demographic criteria actually computable per neighborhood.
  * Bay Area: all 101 incorporated cities and towns in the 9 counties
    (Alameda, Contra Costa, Marin, Napa, San Francisco, San Mateo, Santa Clara,
    Solano, Sonoma).
  * Unincorporated: census-designated places (CDPs) that are real, named
    communities people relocate to. Threshold ~1,000 residents, plus a handful of
    well-known sub-1,000 coastal/rural villages included as markers.

Fields: name, county, kind, lat, lon, pop, corridor
  kind: sf_hood | city | town | cdp
  corridor: drive corridor into downtown SF, used by the drive-time model.
"""

# corridor codes
SF = "SF"                    # within San Francisco
PEN101 = "PEN_101"           # Peninsula via US-101
PEN280 = "PEN_280"           # Peninsula via I-280 / Skyline
COAST_S = "COAST_S"          # San Mateo coast via Hwy 1
EB_BAY = "EB_BAYBRIDGE"      # inner East Bay via Bay Bridge / I-80
EB_24 = "EB_HWY24"           # Lamorinda / central CC via Hwy 24 + Caldecott
EB_680 = "EB_680"            # 680 corridor (Danville/San Ramon/Pleasanton)
EB_580 = "EB_580"            # 580 corridor (Castro Valley/Livermore/Tri-Valley)
EB_EAST = "EB_EASTCOUNTY"    # far east CC (Antioch/Brentwood/Discovery Bay)
NB_101 = "NB_101"            # North Bay via Golden Gate Bridge + US-101
NB_COAST = "NB_COAST"        # West Marin / Sonoma coast
SOL_80 = "SOL_80"            # Solano via I-80 + Carquinez
SBAY = "SOUTH_BAY"           # San Jose / south Santa Clara
NAPA_V = "NAPA_VALLEY"       # Napa Valley via 37/29 or 80
SON_V = "SONOMA_VALLEY"      # Sonoma/Napa valley floor via 37/121

PLACES = [
    # ---------------- SAN FRANCISCO: 41 Analysis Neighborhoods ----------------
    ("Bayview Hunters Point",            "San Francisco", "sf_hood", 37.7300, -122.3850, 37700,  SF),
    ("Bernal Heights",                   "San Francisco", "sf_hood", 37.7400, -122.4150, 25900,  SF),
    ("Castro/Upper Market",              "San Francisco", "sf_hood", 37.7620, -122.4350, 22000,  SF),
    ("Chinatown",                        "San Francisco", "sf_hood", 37.7950, -122.4070, 14800,  SF),
    ("Excelsior",                        "San Francisco", "sf_hood", 37.7240, -122.4270, 40300,  SF),
    ("Financial District/South Beach",   "San Francisco", "sf_hood", 37.7930, -122.3980, 19000,  SF),
    ("Glen Park",                        "San Francisco", "sf_hood", 37.7340, -122.4340, 8500,   SF),
    ("Golden Gate Park",                 "San Francisco", "sf_hood", 37.7690, -122.4830, 50,     SF),
    ("Haight Ashbury",                   "San Francisco", "sf_hood", 37.7700, -122.4460, 17000,  SF),
    ("Hayes Valley",                     "San Francisco", "sf_hood", 37.7760, -122.4260, 9500,   SF),
    ("Inner Richmond",                   "San Francisco", "sf_hood", 37.7810, -122.4650, 23800,  SF),
    ("Inner Sunset",                     "San Francisco", "sf_hood", 37.7620, -122.4700, 22000,  SF),
    ("Japantown",                        "San Francisco", "sf_hood", 37.7850, -122.4300, 3900,   SF),
    ("Lakeshore",                        "San Francisco", "sf_hood", 37.7250, -122.4850, 14000,  SF),
    ("Lincoln Park",                     "San Francisco", "sf_hood", 37.7830, -122.5030, 50,     SF),
    ("Lone Mountain/USF",                "San Francisco", "sf_hood", 37.7780, -122.4520, 24000,  SF),
    ("Marina",                           "San Francisco", "sf_hood", 37.8020, -122.4360, 24000,  SF),
    ("McLaren Park",                     "San Francisco", "sf_hood", 37.7180, -122.4180, 80,     SF),
    ("Mission",                          "San Francisco", "sf_hood", 37.7600, -122.4150, 58800,  SF),
    ("Mission Bay",                      "San Francisco", "sf_hood", 37.7700, -122.3930, 17000,  SF),
    ("Nob Hill",                         "San Francisco", "sf_hood", 37.7930, -122.4160, 26000,  SF),
    ("Noe Valley",                       "San Francisco", "sf_hood", 37.7500, -122.4330, 22000,  SF),
    ("North Beach",                      "San Francisco", "sf_hood", 37.8000, -122.4100, 13000,  SF),
    ("Oceanview/Merced/Ingleside",       "San Francisco", "sf_hood", 37.7180, -122.4590, 28800,  SF),
    ("Outer Mission",                    "San Francisco", "sf_hood", 37.7130, -122.4460, 26000,  SF),
    ("Outer Richmond",                   "San Francisco", "sf_hood", 37.7780, -122.4930, 45000,  SF),
    ("Pacific Heights",                  "San Francisco", "sf_hood", 37.7920, -122.4360, 24000,  SF),
    ("Portola",                          "San Francisco", "sf_hood", 37.7250, -122.4050, 17000,  SF),
    ("Potrero Hill",                     "San Francisco", "sf_hood", 37.7580, -122.4000, 15000,  SF),
    ("Presidio",                         "San Francisco", "sf_hood", 37.7980, -122.4660, 4000,   SF),
    ("Presidio Heights",                 "San Francisco", "sf_hood", 37.7880, -122.4560, 11000,  SF),
    ("Russian Hill",                     "San Francisco", "sf_hood", 37.8010, -122.4190, 18900,  SF),
    ("Seacliff",                         "San Francisco", "sf_hood", 37.7860, -122.4900, 2500,   SF),
    ("South of Market",                  "San Francisco", "sf_hood", 37.7780, -122.4090, 19000,  SF),
    ("Sunset/Parkside",                  "San Francisco", "sf_hood", 37.7480, -122.4950, 84600,  SF),
    ("Tenderloin",                       "San Francisco", "sf_hood", 37.7840, -122.4140, 28000,  SF),
    ("Treasure Island",                  "San Francisco", "sf_hood", 37.8230, -122.3700, 2500,   SF),
    ("Twin Peaks",                       "San Francisco", "sf_hood", 37.7500, -122.4470, 7000,   SF),
    ("Visitacion Valley",                "San Francisco", "sf_hood", 37.7130, -122.4090, 19000,  SF),
    ("West of Twin Peaks",               "San Francisco", "sf_hood", 37.7350, -122.4590, 39000,  SF),
    ("Western Addition",                 "San Francisco", "sf_hood", 37.7800, -122.4340, 25000,  SF),

    # ---------------- ALAMEDA COUNTY ----------------
    ("Alameda",        "Alameda", "city", 37.7652, -122.2416, 78280,  EB_BAY),
    ("Albany",         "Alameda", "city", 37.8869, -122.2977, 20271,  EB_BAY),
    ("Berkeley",       "Alameda", "city", 37.8715, -122.2730, 124321, EB_BAY),
    ("Dublin",         "Alameda", "city", 37.7022, -121.9358, 72589,  EB_580),
    ("Emeryville",     "Alameda", "city", 37.8313, -122.2852, 12905,  EB_BAY),
    ("Fremont",        "Alameda", "city", 37.5485, -121.9886, 230504, EB_580),
    ("Hayward",        "Alameda", "city", 37.6688, -122.0808, 162954, EB_580),
    ("Livermore",      "Alameda", "city", 37.6819, -121.7680, 87955,  EB_580),
    ("Newark",         "Alameda", "city", 37.5297, -122.0402, 47529,  EB_580),
    ("Oakland",        "Alameda", "city", 37.8044, -122.2711, 440646, EB_BAY),
    ("Piedmont",       "Alameda", "city", 37.8244, -122.2316, 11270,  EB_BAY),
    ("Pleasanton",     "Alameda", "city", 37.6624, -121.8747, 79871,  EB_580),
    ("San Leandro",    "Alameda", "city", 37.7249, -122.1561, 91008,  EB_580),
    ("Union City",     "Alameda", "city", 37.5934, -122.0438, 70143,  EB_580),
    ("Castro Valley",  "Alameda", "cdp",  37.6941, -122.0863, 66441,  EB_580),
    ("San Lorenzo",    "Alameda", "cdp",  37.6810, -122.1244, 29581,  EB_580),
    ("Ashland",        "Alameda", "cdp",  37.6949, -122.1136, 23192,  EB_580),
    ("Cherryland",     "Alameda", "cdp",  37.6788, -122.0994, 15882,  EB_580),
    ("Fairview",       "Alameda", "cdp",  37.6588, -122.0450, 10003,  EB_580),
    ("Sunol",          "Alameda", "cdp",  37.5947, -121.8869, 913,    EB_580),

    # ---------------- CONTRA COSTA COUNTY ----------------
    ("Antioch",             "Contra Costa", "city", 38.0049, -121.8058, 115291, EB_EAST),
    ("Brentwood",           "Contra Costa", "city", 37.9319, -121.6958, 64292,  EB_EAST),
    ("Clayton",             "Contra Costa", "city", 37.9410, -121.9358, 11070,  EB_24),
    ("Concord",             "Contra Costa", "city", 37.9780, -122.0311, 125410, EB_24),
    ("Danville",            "Contra Costa", "town", 37.8216, -121.9999, 43582,  EB_680),
    ("El Cerrito",          "Contra Costa", "city", 37.9161, -122.3108, 25962,  EB_BAY),
    ("Hercules",            "Contra Costa", "city", 38.0172, -122.2886, 26016,  EB_BAY),
    ("Lafayette",           "Contra Costa", "city", 37.8858, -122.1180, 25391,  EB_24),
    ("Martinez",            "Contra Costa", "city", 38.0194, -122.1341, 37287,  EB_24),
    ("Moraga",              "Contra Costa", "town", 37.8349, -122.1297, 16870,  EB_24),
    ("Oakley",              "Contra Costa", "city", 37.9974, -121.7124, 43357,  EB_EAST),
    ("Orinda",              "Contra Costa", "city", 37.8771, -122.1797, 19514,  EB_24),
    ("Pinole",              "Contra Costa", "city", 38.0044, -122.2989, 19038,  EB_BAY),
    ("Pittsburg",           "Contra Costa", "city", 38.0280, -121.8847, 76416,  EB_EAST),
    ("Pleasant Hill",       "Contra Costa", "city", 37.9480, -122.0608, 34613,  EB_24),
    ("Richmond",            "Contra Costa", "city", 37.9358, -122.3477, 116448, EB_BAY),
    ("San Pablo",           "Contra Costa", "city", 37.9621, -122.3455, 31845,  EB_BAY),
    ("San Ramon",           "Contra Costa", "city", 37.7799, -121.9780, 84605,  EB_680),
    ("Walnut Creek",        "Contra Costa", "city", 37.9101, -122.0652, 70127,  EB_24),
    ("Alamo",               "Contra Costa", "cdp",  37.8502, -122.0322, 14570,  EB_680),
    ("Bay Point",           "Contra Costa", "cdp",  38.0296, -121.9591, 25275,  EB_EAST),
    ("Blackhawk",           "Contra Costa", "cdp",  37.8163, -121.9105, 9354,   EB_680),
    ("Discovery Bay",       "Contra Costa", "cdp",  37.9082, -121.6002, 15235,  EB_EAST),
    ("El Sobrante",         "Contra Costa", "cdp",  37.9752, -122.2939, 14169,  EB_BAY),
    ("Kensington",          "Contra Costa", "cdp",  37.9077, -122.2802, 5077,   EB_BAY),
    ("Pacheco",             "Contra Costa", "cdp",  37.9827, -122.0755, 4022,   EB_24),
    ("Rodeo",               "Contra Costa", "cdp",  38.0324, -122.2666, 10563,  EB_BAY),
    ("Crockett",            "Contra Costa", "cdp",  38.0522, -122.2136, 3268,   EB_BAY),
    ("North Richmond",      "Contra Costa", "cdp",  37.9527, -122.3697, 4079,   EB_BAY),
    ("Tara Hills",          "Contra Costa", "cdp",  37.9985, -122.3116, 5126,   EB_BAY),
    ("Vine Hill",           "Contra Costa", "cdp",  38.0138, -122.1122, 3761,   EB_24),
    ("Contra Costa Centre", "Contra Costa", "cdp",  37.9299, -122.0575, 6097,   EB_24),
    ("Saranap",             "Contra Costa", "cdp",  37.8763, -122.0710, 5652,   EB_24),
    ("Bethel Island",       "Contra Costa", "cdp",  38.0135, -121.6402, 2137,   EB_EAST),
    ("Knightsen",           "Contra Costa", "cdp",  37.9682, -121.6602, 1568,   EB_EAST),
    ("Byron",               "Contra Costa", "cdp",  37.8677, -121.6380, 1277,   EB_EAST),
    ("Diablo",              "Contra Costa", "cdp",  37.8391, -121.9591, 1113,   EB_680),
    ("Acalanes Ridge",      "Contra Costa", "cdp",  37.9127, -122.0836, 1137,   EB_24),

    # ---------------- MARIN COUNTY ----------------
    ("Belvedere",                     "Marin", "city", 37.8724, -122.4644, 2126,  NB_101),
    ("Corte Madera",                  "Marin", "town", 37.9255, -122.5275, 10222, NB_101),
    ("Fairfax",                       "Marin", "town", 37.9871, -122.5889, 7605,  NB_101),
    ("Larkspur",                      "Marin", "city", 37.9341, -122.5353, 13064, NB_101),
    ("Mill Valley",                   "Marin", "city", 37.9060, -122.5450, 14231, NB_101),
    ("Novato",                        "Marin", "city", 38.1074, -122.5697, 53225, NB_101),
    ("Ross",                          "Marin", "town", 37.9624, -122.5550, 2338,  NB_101),
    ("San Anselmo",                   "Marin", "town", 37.9747, -122.5614, 12830, NB_101),
    ("San Rafael",                    "Marin", "city", 37.9735, -122.5311, 61271, NB_101),
    ("Sausalito",                     "Marin", "city", 37.8591, -122.4853, 7269,  NB_101),
    ("Tiburon",                       "Marin", "town", 37.8735, -122.4569, 9148,  NB_101),
    ("Kentfield",                     "Marin", "cdp",  37.9524, -122.5572, 6485,  NB_101),
    ("Greenbrae",                     "Marin", "cdp",  37.9455, -122.5238, 1586,  NB_101),
    ("Marin City",                    "Marin", "cdp",  37.8688, -122.5097, 3061,  NB_101),
    ("Strawberry",                    "Marin", "cdp",  37.8905, -122.5069, 5393,  NB_101),
    ("Tamalpais-Homestead Valley",    "Marin", "cdp",  37.8768, -122.5364, 10377, NB_101),
    ("Lucas Valley-Marinwood",        "Marin", "cdp",  38.0338, -122.5794, 6043,  NB_101),
    ("Santa Venetia",                 "Marin", "cdp",  38.0038, -122.5119, 4834,  NB_101),
    ("Sleepy Hollow",                 "Marin", "cdp",  37.9927, -122.5678, 2428,  NB_101),
    ("Lagunitas-Forest Knolls",       "Marin", "cdp",  38.0141, -122.6905, 1435,  NB_COAST),
    ("Woodacre",                      "Marin", "cdp",  38.0135, -122.6444, 1566,  NB_COAST),
    ("Black Point-Green Point",       "Marin", "cdp",  38.1177, -122.5133, 1306,  NB_101),
    ("Bolinas",                       "Marin", "cdp",  37.9091, -122.6864, 1620,  NB_COAST),
    ("Inverness",                     "Marin", "cdp",  38.1005, -122.8569, 1304,  NB_COAST),
    ("Point Reyes Station",           "Marin", "cdp",  38.0680, -122.8064, 848,   NB_COAST),
    ("Stinson Beach",                 "Marin", "cdp",  37.9005, -122.6441, 632,   NB_COAST),

    # ---------------- NAPA COUNTY ----------------
    ("American Canyon", "Napa", "city", 38.1749, -122.2608, 21837, NAPA_V),
    ("Calistoga",       "Napa", "city", 38.5788, -122.5797, 5228,  NAPA_V),
    ("Napa",            "Napa", "city", 38.2975, -122.2869, 79246, NAPA_V),
    ("St. Helena",      "Napa", "city", 38.5052, -122.4703, 5438,  NAPA_V),
    ("Yountville",      "Napa", "town", 38.4016, -122.3608, 2933,  NAPA_V),
    ("Angwin",          "Napa", "cdp",  38.5749, -122.4467, 3051,  NAPA_V),
    ("Deer Park",       "Napa", "cdp",  38.5252, -122.4880, 1200,  NAPA_V),

    # ---------------- SAN MATEO COUNTY ----------------
    ("Atherton",                 "San Mateo", "town", 37.4613, -122.1977, 7188,   PEN101),
    ("Belmont",                  "San Mateo", "city", 37.5202, -122.2758, 28335,  PEN101),
    ("Brisbane",                 "San Mateo", "city", 37.6808, -122.3999, 4851,   PEN101),
    ("Burlingame",               "San Mateo", "city", 37.5779, -122.3480, 31386,  PEN101),
    ("Colma",                    "San Mateo", "town", 37.6769, -122.4597, 1507,   PEN280),
    ("Daly City",                "San Mateo", "city", 37.6879, -122.4702, 104901, PEN280),
    ("East Palo Alto",           "San Mateo", "city", 37.4688, -122.1411, 30034,  PEN101),
    ("Foster City",              "San Mateo", "city", 37.5585, -122.2711, 33805,  PEN101),
    ("Half Moon Bay",            "San Mateo", "city", 37.4636, -122.4286, 11795,  COAST_S),
    ("Hillsborough",             "San Mateo", "town", 37.5741, -122.3794, 11387,  PEN280),
    ("Menlo Park",               "San Mateo", "city", 37.4530, -122.1817, 33780,  PEN101),
    ("Millbrae",                 "San Mateo", "city", 37.5985, -122.3872, 23216,  PEN101),
    ("Pacifica",                 "San Mateo", "city", 37.6138, -122.4869, 38640,  COAST_S),
    ("Portola Valley",           "San Mateo", "town", 37.3841, -122.2352, 4456,   PEN280),
    ("Redwood City",             "San Mateo", "city", 37.4852, -122.2364, 84292,  PEN101),
    ("San Bruno",                "San Mateo", "city", 37.6305, -122.4111, 43908,  PEN101),
    ("San Carlos",               "San Mateo", "city", 37.5072, -122.2605, 30722,  PEN101),
    ("San Mateo",                "San Mateo", "city", 37.5630, -122.3255, 105661, PEN101),
    ("South San Francisco",      "San Mateo", "city", 37.6547, -122.4077, 66105,  PEN101),
    ("Woodside",                 "San Mateo", "town", 37.4297, -122.2539, 5309,   PEN280),
    ("Broadmoor",                "San Mateo", "cdp",  37.6913, -122.4830, 4176,   PEN280),
    ("Emerald Lake Hills",       "San Mateo", "cdp",  37.4685, -122.2588, 4528,   PEN280),
    ("Highlands-Baywood Park",   "San Mateo", "cdp",  37.5252, -122.3419, 4376,   PEN280),
    ("North Fair Oaks",          "San Mateo", "cdp",  37.4744, -122.1975, 14687,  PEN101),
    ("West Menlo Park",          "San Mateo", "cdp",  37.4258, -122.2011, 3712,   PEN280),
    ("Menlo Oaks",               "San Mateo", "cdp",  37.4664, -122.1730, 3127,   PEN101),
    ("Ladera",                   "San Mateo", "cdp",  37.3894, -122.1994, 1499,   PEN280),
    ("Burlingame Hills",         "San Mateo", "cdp",  37.5722, -122.3661, 1545,   PEN280),
    ("Montara",                  "San Mateo", "cdp",  37.5422, -122.5061, 2833,   COAST_S),
    ("Moss Beach",               "San Mateo", "cdp",  37.5266, -122.5122, 3103,   COAST_S),
    ("El Granada",               "San Mateo", "cdp",  37.5027, -122.4694, 5417,   COAST_S),
    ("La Honda",                 "San Mateo", "cdp",  37.3188, -122.2747, 928,    COAST_S),
    ("Pescadero",                "San Mateo", "cdp",  37.2552, -122.3833, 643,    COAST_S),

    # ---------------- SANTA CLARA COUNTY ----------------
    ("Campbell",        "Santa Clara", "city", 37.2872, -121.9500, 42726,  SBAY),
    ("Cupertino",       "Santa Clara", "city", 37.3230, -122.0322, 60381,  SBAY),
    ("Gilroy",          "Santa Clara", "city", 37.0058, -121.5683, 59520,  SBAY),
    ("Los Altos",       "Santa Clara", "city", 37.3852, -122.1141, 31625,  PEN101),
    ("Los Altos Hills", "Santa Clara", "town", 37.3797, -122.1372, 8489,   PEN280),
    ("Los Gatos",       "Santa Clara", "town", 37.2358, -121.9624, 33529,  SBAY),
    ("Milpitas",        "Santa Clara", "city", 37.4323, -121.8996, 80273,  SBAY),
    ("Monte Sereno",    "Santa Clara", "city", 37.2366, -121.9924, 3479,   SBAY),
    ("Morgan Hill",     "Santa Clara", "city", 37.1305, -121.6544, 45952,  SBAY),
    ("Mountain View",   "Santa Clara", "city", 37.3861, -122.0839, 82376,  PEN101),
    ("Palo Alto",       "Santa Clara", "city", 37.4419, -122.1430, 68572,  PEN101),
    ("San Jose",        "Santa Clara", "city", 37.3382, -121.8863, 983489, SBAY),
    ("Santa Clara",     "Santa Clara", "city", 37.3541, -121.9552, 127647, SBAY),
    ("Saratoga",        "Santa Clara", "city", 37.2638, -122.0230, 31051,  SBAY),
    ("Sunnyvale",       "Santa Clara", "city", 37.3688, -122.0363, 155805, PEN101),
    ("Alum Rock",       "Santa Clara", "cdp",  37.3663, -121.8271, 13479,  SBAY),
    ("Burbank",         "Santa Clara", "cdp",  37.3255, -121.9310, 5157,   SBAY),
    ("Cambrian Park",   "Santa Clara", "cdp",  37.2572, -121.9314, 3281,   SBAY),
    ("East Foothills",  "Santa Clara", "cdp",  37.3722, -121.8283, 8269,   SBAY),
    ("Lexington Hills", "Santa Clara", "cdp",  37.1866, -121.9866, 2530,   SBAY),
    ("Loyola",          "Santa Clara", "cdp",  37.3527, -122.1005, 3477,   PEN280),
    ("San Martin",      "Santa Clara", "cdp",  37.0844, -121.6100, 7027,   SBAY),
    ("Stanford",        "Santa Clara", "cdp",  37.4241, -122.1661, 21150,  PEN101),

    # ---------------- SOLANO COUNTY ----------------
    ("Benicia",      "Solano", "city", 38.0494, -122.1586, 27131,  SOL_80),
    ("Dixon",        "Solano", "city", 38.4455, -121.8233, 18988,  SOL_80),
    ("Fairfield",    "Solano", "city", 38.2494, -122.0400, 119881, SOL_80),
    ("Rio Vista",    "Solano", "city", 38.1557, -121.6913, 10265,  SOL_80),
    ("Suisun City",  "Solano", "city", 38.2383, -122.0405, 29518,  SOL_80),
    ("Vacaville",    "Solano", "city", 38.3566, -121.9877, 102386, SOL_80),
    ("Vallejo",      "Solano", "city", 38.1041, -122.2566, 126090, SOL_80),

    # ---------------- SONOMA COUNTY ----------------
    ("Cloverdale",     "Sonoma", "city", 38.8055, -123.0172, 8995,   NB_101),
    ("Cotati",         "Sonoma", "city", 38.3277, -122.7094, 7584,   NB_101),
    ("Healdsburg",     "Sonoma", "city", 38.6102, -122.8694, 11340,  NB_101),
    ("Petaluma",       "Sonoma", "city", 38.2324, -122.6367, 59776,  NB_101),
    ("Rohnert Park",   "Sonoma", "city", 38.3396, -122.7011, 44390,  NB_101),
    ("Santa Rosa",     "Sonoma", "city", 38.4404, -122.7141, 178127, NB_101),
    ("Sebastopol",     "Sonoma", "city", 38.4021, -122.8239, 7521,   NB_101),
    ("Sonoma",         "Sonoma", "city", 38.2919, -122.4580, 10739,  SON_V),
    ("Windsor",        "Sonoma", "town", 38.5471, -122.8164, 26344,  NB_101),
    ("Boyes Hot Springs",                    "Sonoma", "cdp", 38.3138, -122.4830, 6656,  SON_V),
    ("El Verano",                            "Sonoma", "cdp", 38.2949, -122.4930, 4282,  SON_V),
    ("Fetters Hot Springs-Agua Caliente",    "Sonoma", "cdp", 38.3216, -122.4869, 2500,  SON_V),
    ("Glen Ellen",                           "Sonoma", "cdp", 38.3652, -122.5236, 1101,  SON_V),
    ("Kenwood",                              "Sonoma", "cdp", 38.4113, -122.5450, 1028,  SON_V),
    ("Temelec",                              "Sonoma", "cdp", 38.2705, -122.4830, 1344,  SON_V),
    ("Penngrove",                            "Sonoma", "cdp", 38.2977, -122.6666, 2362,  NB_101),
    ("Larkfield-Wikiup",                     "Sonoma", "cdp", 38.5063, -122.7449, 8884,  NB_101),
    ("Graton",                               "Sonoma", "cdp", 38.4341, -122.8666, 1815,  NB_101),
    ("Forestville",                          "Sonoma", "cdp", 38.4727, -122.8905, 3293,  NB_COAST),
    ("Guerneville",                          "Sonoma", "cdp", 38.5019, -123.0025, 4534,  NB_COAST),
    ("Monte Rio",                            "Sonoma", "cdp", 38.4655, -123.0102, 1152,  NB_COAST),
    ("Occidental",                           "Sonoma", "cdp", 38.4066, -122.9483, 1115,  NB_COAST),
    ("Bodega Bay",                           "Sonoma", "cdp", 38.3330, -123.0480, 1077,  NB_COAST),
    ("Sea Ranch",                            "Sonoma", "cdp", 38.7099, -123.4436, 1305,  NB_COAST),
    ("Geyserville",                          "Sonoma", "cdp", 38.7052, -122.9036, 862,   NB_101),
]

if __name__ == "__main__":
    from collections import Counter
    print("TOTAL PLACES:", len(PLACES))
    print()
    for k, v in sorted(Counter(p[1] for p in PLACES).items()):
        print(f"  {k:16s} {v:4d}")
    print()
    for k, v in sorted(Counter(p[2] for p in PLACES).items()):
        print(f"  {k:16s} {v:4d}")
    names = [p[0] for p in PLACES]
    dupes = [n for n, c in Counter(names).items() if c > 1]
    print("\nDUPLICATE NAMES:", dupes or "none")
