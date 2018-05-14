class Vyvoj {

    miska;
    sucasnaGeneracia;
    hibernacia;

    constructor(miska){
        this.miska = miska;
        this.hibernacia = true;
        if (this.miska) {
            this.init();
            this.tiktak();
        }
    }

    init(random) {
        for (var i = 0; i < this.miska.bunky.length; i++) {
            var self = this;
            if (random) {
                self.miska.bunky[i].stav = self.nahodnyStavBunky();
            } else {
                self.miska.bunky[i].stav = 0; 
            }
            // self.miska.zobrazBunku(self.miska.bunky[i]);
        }
        console.log('BUNKY VYTVORENY');
        for (var i = 0; i < this.miska.bunky.length; i++) {
            this.miska.zobrazBunku(this.miska.bunky[i]);
        }
        console.log('BUNKY ZOBRAZENY');

        // test hightlight
        this.highlightSusedov(this.miska.bunky);
        
    }

    tiktak() {
        if (!this.hibernacia) {
            this.pristiGeneracia();
        }
        requestAnimationFrame(this.tiktak.bind(this));
    }

    // pristi generace
    pristiGeneracia() {
        var stavy = [];
        var bunky = this.miska.bunky;
        for (var i = 0; i < bunky.length; i++) {
            var bunka = bunky[i];
            stavy.push(bunka.zhodnotSituaci());
        }
        console.log('STAVY ZHODNOCENY');
        // prekresli bunky a nastav stavy;
        for (var i = 0; i < bunky.length; i++) {
            var bunka = bunky[i];
            bunka.stav = stavy[i];
            this.miska.zobrazBunku(bunka);
        }
        /* var test = [];
        for (var i = 0; i < bunky.length; i++) {
            test.push(bunky[i].stav);
        } */
        console.log('BUNKY PREKRESLENY');
        // test hightlight
        this.highlightSusedov(bunky);

    }

    oziv() {
        this.hibernacia = false;
    }

    hybernuj() {
        this.hibernacia = true;
    }

    nahodnyStavBunky() {
        return Math.floor(Math.random() * 2);
    }


    // test
    highlightSusedov(bunky) {
        for (var i = 0; i < bunky.length; i++) {
            var bunka = bunky[i];
            if (bunka.x === 320 && bunka.y === 320) {
                // console.log(bunky[i]);
                for (var j = 0; j < bunka.susedia.length; j++) {
                    bunka.susedia[j].domElement.classList.add('highlight');
                }
            }
            
        }
    }
}