"use strict";

class Vyvoj {

    constructor(miska){
        this.miska = miska;
        this.hibernacia = true;
        if (this.miska) {
            this.init();
            this.tiktak();
        }
    }

    init(random) {
        // console.log('-------------- init --------------')
        for (var i = 0; i < this.miska.bunky.length; i++) {
            if (random) {
                this.miska.bunky[i].stav = this.nahodnyStavBunky();
            } else {
                this.miska.bunky[i].stav = 0; 
            }
        }
        // console.log('BUNKY VYTVORENY');
        for (var i = 0; i < this.miska.bunky.length; i++) {
            this.miska.zobrazBunku(this.miska.bunky[i]);
        }
        // console.log('BUNKY ZOBRAZENY');

        // test hightlight
        // this.highlightSusedov(this.miska.bunky);
        
    }

    tiktak() {
        if (!this.hibernacia) {
            this.pristiGeneracia();
        }
        requestAnimationFrame(this.tiktak.bind(this));
    }

    // pristi generace
    pristiGeneracia() {
        // console.log('-------------- pristiGeneracia --------------');
        let noveStavy = [];
        // aktualni stav
        const bunky = this.miska.bunky;
        // zhodnot situaci
        for (let i = 0; i < bunky.length; i++) {
            const bunka = bunky[i];
            noveStavy.push(this.miska.bunky[i].zhodnotSvouSituaci());
        }
        // console.log('STAVY ZHODNOCENY');
        // prekresli bunky a nastav nove stavy;
        for (let i = 0; i < bunky.length; i++) {
            const bunka = bunky[i];
            if (bunka.stav !== noveStavy[i]) {
                bunka.zmenStav();
            }
            this.miska.zobrazBunku(bunka);
        }
        // console.log('BUNKY PREKRESLENY');
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

// export
export default Vyvoj;