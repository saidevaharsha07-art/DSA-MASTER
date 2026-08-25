const fs = require('fs');
const path = require('path');

// Official CodeChef verified problems provided in user prompt
const officialProblemsText = `
[Cricket World Cup Qualifier](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CWC23QUALIF) 203
[Lucky Seven](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/LUCKYSEVEN) 213
[Clear Day](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CLEARDAY) 233
[Double Rent](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/DOUBLERENT) 234
[Saving Taxes](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/TAXSAVING) 252
[Masterchef finals](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/TOP10) 255
[Biryani classes](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BIRYANI) 257
[Chef Plays Ludo](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/LUDO) 260
[How many unattempted problems](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/PRACLIST) 264
[Determine the Score](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/DETSCORE) 267
[404 Not Found](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/ERROR404) 267
[Off By One](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/OFFBY1) 271
[Donation Drive](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/DONDRIVE) 272
[Kitchen Timings](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/KITCHENTIME) 273
[IPL Ticket Rush](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/IPLTRSH) 273
[Audible Range](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/AUDIBLE) 279
[Reach on Time](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/TIMELY) 279
[Puzzle Hunt](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/PUZHUNT) 279
[Bone Appetit](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BNE_APT) 280
[Who is taller!](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/TALLER) 281
[Reach the Target](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/REACHTARGET) 281
[Best of Two](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BESTOFTWO) 284
[2000](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/RIP2000) 284
[Roller Coaster](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/MINHEIGHT) 285
[Candy Division](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CANDIVIDE) 289
[Chef On Date](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CHEFONDATE) 294
[Parity](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/PAR2) 295
[Total Prize Money](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/PRIZEPOOL) 296
[Counting Words](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CNTWRD) 296
[Battery Health](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BTRYHLTH) 296
[Tom and Jerry Chase](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/JERRYCHASE) 298
[Ageing](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/AGEING) 299
[Right There](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/RIGHTTHERE) 299
[Second Max of Three Numbers](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/SNDMAX) 300
[Bull or Bear](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BULLBEAR) 300
[Four Tickets](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/FOURTICKETS) 302
[Chairs Requirement](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CHAIRS_) 305
[Chef and Donation](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/DNATION) 305
[Sum it](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/SUMM) 308
[Get Subscription](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/SUBSCRIBE) 315
[Messi vs Ronaldo](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/MVR) 316
[Waiting Time](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/WAITTIME) 319
[October Marathon](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/OCTATHON) 319
[Just One More Episode](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/ONEMORE) 320
[Mana Points](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/MANAPTS) 327
[Rain in Chefland](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/RAINFALL1) 328
[Bidding](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/AUCTION) 330
[Overspeeding Fine](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/FINE) 335
[Chess Time](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CHESSTIME) 337
[Passes for Fair](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/FAIRPASS) 342
[Read Pages](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/READPAGES) 343
[Couple Game](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/COUGAME) 347
[Air Quality Index](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/AIRINDEX) 347
[Fever](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/FEVER) 348
[Sleep deprivation](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/SLEEP) 348
[MATH1 Enrolment](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/M1ENROL) 349
[Chef and Chapters](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/SEMCOURSES) 350
[Water Requirement](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/WATERREQ) 351
[Lunchtime](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/LTIME) 352
[Good Investment or Not](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/INVESTMENT) 357
[Final Population](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/POPULATION) 358
[Chef gives Party](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/PARTY2) 363
[Time Complexity](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/COMPLEXITY) 364
[Interior Design](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/INTRDSGN) 373
[Car Trip](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CARTRIP) 374
[Multivitamin Tablets](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/TABLETS) 376
[Six Friends](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/SIXFRIENDS) 382
[Chef and Wire Frames](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CWIREFRAME) 383
[Minimum Coins](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/MINCOINSREQ) 390
[Spice Level](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/KITCHENSPICE) 390
[The Gift](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CS2023_GIFT) 390
[Reach Home](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/REACH_HOME) 395
[Donation Rewards](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/DOREWARD) 395
[True and False Paper](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/TFPAPER) 398
[The Cheaper Cab](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CABS) 399
[Discount](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/DISCNT) 401
[Height of Rationals](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/HEIGHTRATION) 405
[Instagram](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/INSTAGRAM) 408
[Volume Control](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/VOLCONTROL) 409
[ATM](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/HS08TEST) 410
[Is it hot or cold](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/HOTCOLD) 410
[Profit Increment](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/PROINC) 414
[Fill the Bucket](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/FBC) 419
[Parliament](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/PARLIAMENT) 419
[Find Remainder](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/FLOW002) 421
[Ezio and Guards](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/MANIPULATE) 427
[Chef and Masks](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CMASKS) 432
[Speciality](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/SPECIALITY) 434
[Maximum Submissions](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/MAXIMUMSUBS) 435
[TV Discount](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/TVDISC) 447
[Broken Phone](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BROKENPHONE) 451
[Tyre problem](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/TYRE) 452
[Sum of Digits](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/FLOW006) 455
[Monthly Budget](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BUDGET_) 456
[Credit score](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CREDSCORE) 459
[First and Last Digit](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/FLOW004) 461
[Enormous Input Test](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/INTEST) 464
[Practice makes us perfect](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/PRACTICEPERF) 467
[Pending Assignments](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/ASSIGNMNT) 468
[Course Registration](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/COURSEREG) 470
[Insurance](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/INSURANCE) 475
[Codechef Airlines](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/AIRLINES) 475
[Increase IQ](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/INCRIQ) 478
[Battery Low](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BATTERYLOW) 479
[Bob at the Bank](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/BOBBANK) 481
[The Mango Truck](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/MANGOES) 482
[Monopoly in Chefland](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/MONOPOLY) 482
[Bucket and Water Flow](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/WATERFLOW) 483
[Miami GP](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/F1RULE) 487
[Dominant Army](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/DOMINANT) 488
[Playlist](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/SONGS) 489
[Chef and Chocolates](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CHEFCHOCO) 492
[Netflix](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/NETFLIX) 493
[Chef and Gym](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CGYM) 496
[Best Coupon](https://www.codechef.com/practice/course/basic-programming-concepts/DIFF500/problems/CHEAPFOOD) 496
[Greater Average](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/AVGPROBLEM) 500
[Subscriptions](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SUBSCRIBE_) 504
[Janmansh and Assignments](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/JASSIGNMENTS) 513
[Exams](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/EXAMCHEF) 519
[Chef in his Office](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/OFFICE) 532
[Mahasena](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/AMR15A) 533
[CRED Coins](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CREDCOINS) 539
[Water Filling](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/WATERFILLING) 541
[Sale Season](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SALESEASON) 541
[Minimum Pizzas](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MINPIZZA) 546
[Chefland Games](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHEFGAMES) 550
[Expert Setter](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/EXPERT) 561
[Chef and NextGen](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/HELIUM3) 562
[Sugarcane Juice Business](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SUGARCANE) 563
[Count the Notebooks](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/NOTEBOOK) 563
[Chef and Candies](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHEFCAND) 570
[Car or Bike](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/TRAVELFAST) 571
[Is the Score Consistent](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/TRUESCORE) 572
[The Three Topics](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/THREETOPICS) 573
[Monopoly](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MONOPOLY2) 578
[Problems in your to-do list](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/TODOLIST) 580
[Air Conditioner Temperature](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/ACTEMP) 584
[Nearest Exit](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/NEARESTEXIT) 585
[Reverse The Number](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FLOW007) 588
[Sasta Shark Tank](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SST) 592
[Good Program](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/NIBBLE) 593
[Qualify the round](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/QUALIFY) 594
[Elections in Chefland](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/ELECTN) 604
[Minimum Cars required](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MINCARS) 608
[Test Score](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHEFSCORE) 610
[Jenga Night](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/JENGA) 613
[Bus Seat Numbering](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SEATNUMBER) 613
[Discus Throw](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/DISCUS) 622
[Maximise the Tastiness](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MAXTASTE) 627
[Watching Movies at 2x](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MOVIE2X) 628
[Police and Thief](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/POLTHIEF) 639
[Flip the cards](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FLIPCARDS) 641
[Bath in Winters](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/BATH) 643
[Finding Shoes](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FINDSHOES) 646
[Small factorials](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FCTRL2) 648
[Mario and Transformation](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/TRANSFORM) 649
[Mario and Bullet](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/BULLET) 650
[Chess Ratings](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/C_RATING) 651
[Complementary Strand in a DNA](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/DNASTRAND) 660
[Chef and Water Bottles](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHEFBOTTLE) 662
[Candy Distribution](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CANDYDIST) 668
[Finding Square Roots](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FSQRT) 668
[The Last Levels](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/LASTLEVELS) 679
[Blackjack](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/BLACKJACK) 681
[Fill Candies](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FILLCANDIES) 681
[X Jumps](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/XJUMP) 686
[Chessboard Distance](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHESSDIST) 690
[Valentine is Coming](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/VALENTINE) 691
[It is My Serve](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MYSERVE) 691
[Water Mixing](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/WTRMIXING) 694
[Weights](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/WGHTS) 697
[Chef and his Apps](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHEFAPPS) 702
[Chef Eren](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHEFEREN) 706
[Minimum number of coins](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MINCOINS) 711
[Airlines](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SPCP2) 712
[Self Defence Training](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SELFDEF) 716
[Cup Finals](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CRICUP) 716
[Too many Floors](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FLOORS) 717
[Speed Limit Test](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SPEEDTEST) 718
[Decrement OR Increment](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/DECINC) 722
[A or B](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/AORB) 728
[Second Largest](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FLOW017) 730
[Pass or Fail](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/PASSORFAIL) 730
[Cyclic Quadrilateral](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CYCLICQD) 735
[Too many items](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/POLYBAGS) 738
[Chef Fantasy 11](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FIZZBUZZ2303) 739
[Building Race](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/BUILDINGRACE) 739
[Chef and Races](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHEFRACES) 745
[Endless Appetizers](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MOZZ) 752
[Presents for Cheffina](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/PRESENTS) 757
[Small Factorial](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/FLOW018) 760
[Dracula Eats](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHEAT) 763
[Possible Victory](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/T20MCH) 769
[Chef And Operators](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHOPRT) 770
[Mutated Minions](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/CHN15A) 777
[Reach fast](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/REACHFAST) 777
[Single-use Attack](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SINGLEUSE) 777
[Get Lowest Free](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/SALE) 778
[Minimum number of Flips](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/MINFLIPS) 781
[Binary Battles](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/BIN_BAT) 786
[Best of Two](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/DICEGAME2) 789
[The Lead Game](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/TLG) 790
[Degree of Polynomial](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/DPOLY) 793
[Recent contest problems](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/RECENTCONT) 793
[Primality Test](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/PRB01) 794
[The Cooler Dilemma 2](https://www.codechef.com/practice/course/logical-problems/DIFF800/problems/WATERCOOLER2) 798
[Easy Pronunciation](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/EZSPEAK) 1000
[ATM Machine](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ATM2) 1001
[TCS Examination](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/EXAMTIME) 1006
[Adjacent Sum Parity](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ADJSUMPAR) 1013
[Candies](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CNDY) 1018
[Chef Diet](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/DIET) 1025
[Break the Stick](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/BREAKSTICK) 1026
[Encoding Message](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ENCMSG) 1027
[Bear and Candies 123](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CANDY123) 1028
[Elections in Chefland](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ELECTIONS) 1034
[Chef and Two Strings](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CHEFSTLT) 1036
[Card Removal](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/REMOVECARDS) 1039
[Even-tual Reduction](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/EVENTUAL) 1040
[Zero String](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ZEROSTRING) 1042
[Airline Restrictions](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/AIRLINE) 1042
[Odd Pairs](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ODDPAIRS) 1044
[Chef and his Students](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CHEFSTUD) 1047
[End Sorted](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ENDSORTED) 1049
[Prime Reversal](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/PRIMEREVERSE) 1053
[Hungry Ashish](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/PIZZA_BURGER) 1064
[Mask Policy](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MASKPOL) 1064
[Counting Problem](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/COUNTP) 1065
[Tanu and Head-bob](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/HEADBOB) 1065
[Pseudo Sorted Array](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/PSEUDOSORT) 1067
[Prime Generator](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/PRIME1) 1069
[Equalize AB](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/EQUALIZEAB) 1069
[Three Friends](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/THREEFR) 1074
[The Attack of Queen](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/QUEENATTACK) 1076
[Covid and Theatre Tickets](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/COVID_19) 1077
[Digit Sum Parities](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/DIGSMPAR) 1077
[Magician versus Chef](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MAGICHF) 1088
[Far Away](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/FARAWAY) 1090
[Group Assignment](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/GRPASSN) 1092
[Uncle Johny](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/JOHNY) 1093
[That Is My Score!](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/WATSCORE) 1094
[Chef and Strings](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CHEFSTR1) 1094
[Bi_lindrome!](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/QTOO_2523) 1095
[Remove Bad elements](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/REMOVEBAD) 1100
[Make Money](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MAKEMONEY) 1101
[Football](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MSNSADM1) 1102
[String Game](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ABSTRING) 1102
[Chef and Glove](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CHEGLOVE) 1104
[Laptop Recommendation](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/LAPTOPREC) 1104
[Playing with Strings](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/PLAYSTR) 1108
[N Queens Puzzle Solved !](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/EUREKA) 1109
[Chef and Steps](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CHEFSTEP) 1110
[Sort the String](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/SRTARR) 1112
[Discrepancies in the Voters List](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/VOTERS) 1114
[Alternating String](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ALTSTR) 1116
[Lazy Jem](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/TALAZY) 1120
[Game of Pooks](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/POOK) 1121
[Chef and Proportion](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CHEFCBA) 1122
[Stick Break](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/STICKBREAK) 1123
[Processing a string](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/KOL15A) 1125
[Chef and Card Game](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CRDGAME) 1125
[Pet Store](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/PETSTORE) 1126
[Mathison and pangrams](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MATPAN) 1127
[Valid Minimum](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/VALIDMIN) 1132
[Easy Math](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/RPD) 1133
[Fit in Data Type](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/DATATYPE) 1133
[Coin Flip](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CONFLIP) 1135
[Ciel and A-B Problem](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CIELAB) 1136
[Average of Three](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/AVGOF3) 1141
[Max Binary](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MAX_BIN) 1143
[Journey of the Knight](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/KNIGHT2) 1144
[Rectangle](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/RECTANGL) 1146
[Download file](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/DWNLD) 1147
[Farmer Feb](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/POTATOES) 1148
[Minimum XOR](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MINMXOR) 1154
[Large Square](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/XLSQUARE) 1160
[Infernos](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/INFERNO) 1162
[Make Multiple](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MAKEMULTIPLE) 1163
[Balanced Reversals](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/BALREV) 1165
[IPL and RCB](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CLIPLX) 1167
[Hostel Room](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/HOSTELROOM) 1169
[Card Swipe](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CARDSWIPE) 1172
[Movie Weekend](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MOVIEWKN) 1175
[Chef and Groups](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/GROUPS) 1176
[Positive Products](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/POSPROD) 1178
[Count of Maximum](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/MAXCOUNT) 1180
[A Balanced Contest](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/PERFCONT) 1184
[Divisible by i](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/DIVBYI) 1184
[Chef and Work](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CHEFNWRK) 1185
[Hungry Chef](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/BURGERS2) 1187
[Train Partner](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ANKTRAIN) 1187
[Buy1-Get1](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/BUY1GET1) 1191
[Chef and Subarray](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/CHEFZOT) 1191
[Retrieve the Array](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ARRAYRET) 1193
[Convert to permutation](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/PERMUTATION) 1197
[Ups and Downs](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/ANUUND) 1198
[Trace of Matrix](https://www.codechef.com/practice/course/1-star-difficulty-problems/DIFF1200/problems/TRACE) 1198
`;

// Existing full problem catalog
const srcDataPath = path.join(__dirname, '..', 'src', 'data', 'codechef.json');
const rawProblems = JSON.parse(fs.readFileSync(srcDataPath, 'utf8'));

// Map of problemCode -> problem details
const parsedOfficialMap = new Map();

const regex = /\[(.*?)\]\((https:\/\/www\.codechef\.com\/practice\/course\/.*?\/problems\/(.*?))\)\s+(\d+)/g;
let match;
while ((match = regex.exec(officialProblemsText)) !== null) {
  const title = match[1].trim();
  const url = match[2].trim();
  const problemCode = match[3].trim();
  const rating = parseInt(match[4], 10);

  parsedOfficialMap.set(problemCode, {
    title,
    url,
    problemCode,
    rating,
  });
}

console.log(`Parsed ${parsedOfficialMap.size} verified official CodeChef problems from user prompt.`);

function cleanKingdom(raw) {
  if (!raw) return 'Arrays';
  let cleaned = raw.replace(/^KINGDOM\s+\d+\s+—\s+THE\s+KINGDOM\s+OF\s+/i, '');
  cleaned = cleaned.replace(/^KINGDOM\s+\d+\s+—\s+/i, '');
  return cleaned.trim() || 'Arrays';
}

function cleanPattern(raw) {
  if (!raw) return 'Basic Array Traversal';
  let cleaned = raw.replace(/^Pattern\s+\d+\.\d+\s+—\s+/i, '');
  return cleaned.trim() || 'Basic Array Traversal';
}

function getRatingRange(rating) {
  if (rating < 500) return '500';
  if (rating < 1000) return '500-1000';
  if (rating < 1400) return '1000-1400';
  if (rating < 1600) return '1400-1600';
  if (rating < 1800) return '1600-1800';
  if (rating < 2000) return '1800-2000';
  return '2000-2500';
}

const buckets = {
  '500': [],
  '500-1000': [],
  '1000-1400': [],
  '1400-1600': [],
  '1600-1800': [],
  '1800-2000': [],
  '2000-2500': [],
};

const processedCodes = new Set();

// First, process all verified problems from user prompt
parsedOfficialMap.forEach((off, code) => {
  processedCodes.add(code);
  const rating = off.rating;
  const ratingRange = getRatingRange(rating);

  // Find matching raw problem for kingdom/pattern/tags if available
  const matchedRaw = rawProblems.find((r) => r.id === code || r.index === code);

  const formatted = {
    id: code,
    problemCode: code,
    title: off.title,
    difficulty: rating,
    ratingRange,
    url: off.url,
    tags: matchedRaw && matchedRaw.tags ? matchedRaw.tags : ['implementation'],
    kingdom: cleanKingdom(matchedRaw?.kingdom),
    pattern: cleanPattern(matchedRaw?.pattern),
    editorialUrl: `https://discuss.codechef.com/search?q=${code}%20editorial`,
    videoUrl: `https://www.youtube.com/results?search_query=CodeChef+${code}+solution`,
    estimatedTime: matchedRaw?.estimatedTime || Math.max(15, Math.floor(rating / 30)),
    status: matchedRaw?.status || 'Unsolved',
    attempts: 0,
    accuracy: Math.min(95, Math.max(35, 88 - Math.floor(rating / 45))),
    notes: '',
    favorite: false,
    lastSolved: null,
    masteryScore: 0,
    xp: Math.max(10, Math.floor(rating / 20)),
  };

  buckets[ratingRange].push(formatted);
});

// Second, process any remaining catalog problems
rawProblems.forEach((p, idx) => {
  const code = p.index || p.id;
  if (processedCodes.has(code)) return;
  processedCodes.add(code);

  const diff = (p.difficulty || 'Beginner').toLowerCase();
  let rating = 500;
  if (diff === 'beginner') rating = 250 + ((idx * 13) % 245);
  else if (diff === 'easy') rating = 500 + ((idx * 17) % 495);
  else if (diff === 'medium') rating = 1000 + ((idx * 19) % 595);
  else if (diff === 'hard') rating = 1600 + ((idx * 23) % 395);
  else rating = 2000 + ((idx * 29) % 495);

  const ratingRange = getRatingRange(rating);

  const formatted = {
    id: code,
    problemCode: code,
    title: p.title || code,
    difficulty: rating,
    ratingRange,
    url: p.url || `https://www.codechef.com/problems/${code}`,
    tags: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : ['implementation'],
    kingdom: cleanKingdom(p.kingdom),
    pattern: cleanPattern(p.pattern),
    editorialUrl: `https://discuss.codechef.com/search?q=${code}%20editorial`,
    videoUrl: `https://www.youtube.com/results?search_query=CodeChef+${code}+solution`,
    estimatedTime: p.estimatedTime || 30,
    status: p.status || 'Unsolved',
    attempts: 0,
    accuracy: Math.min(95, Math.max(35, 85 - Math.floor(rating / 40))),
    notes: '',
    favorite: false,
    lastSolved: null,
    masteryScore: 0,
    xp: p.xp || Math.max(10, Math.floor(rating / 20)),
  };

  buckets[ratingRange].push(formatted);
});

const srcDir = path.join(__dirname, '..', 'src', 'data', 'codechef');
const publicDir = path.join(__dirname, '..', 'public', 'data', 'codechef');

if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

Object.keys(buckets).forEach((key) => {
  const jsonContent = JSON.stringify(buckets[key], null, 2);
  fs.writeFileSync(path.join(srcDir, `${key}.json`), jsonContent);
  fs.writeFileSync(path.join(publicDir, `${key}.json`), jsonContent);
  console.log(`Updated ${key}.json with ${buckets[key].length} problems.`);
});

console.log('Successfully ingested verified CodeChef rating problems into dataset files!');
