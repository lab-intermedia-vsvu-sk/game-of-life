class Bunka {
    // vlastnost třídy
    stav;
    x;
    y;
    // htmlElement
    domElement;
    // súsedia
    susedia;
    // konstruktor
    constructor(){}
    // metody třídy
    zhodnotSituaci() { // [0, 1, 1, 0, 0, 1, 1, 0]
        var ziviSusedia = 0;
        // console.log('zhodnotSituaci susedia', this.susedia);
        console.log('pocet susedov', this.susedia.length);
        if (this.susedia && this.susedia.length > 0) {
            for (var i = 0; i < this.susedia.length; i++) {
                if (this.susedia[i] && this.susedia[i].stav === 1) {
                    ziviSusedia++;
                } else {
                    // do nothing
                    // console.warn('mrtvý soused?', this.susedia[i]);
                }
            }
            // console.log('ziviSusedia', ziviSusedia);
            return this.rozhodnuti(ziviSusedia);
        } else {
            console.warn('SUSEDIA NEJSU :(', this);
        }
    }

    

    // privátní
    rozhodnuti(pocetZivychSusedov) {
        /* 
        1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        2. Any live cell with two or three live neighbours lives on to the next generation.
        3. Any live cell with more than three live neighbours dies, as if by overpopulation.
        4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        */
       if (this.stav === 1) { // jsem živá
        if (pocetZivychSusedov < 2) {
            // this.stav = 0;
            this.zmenStav();
        }
        else if (pocetZivychSusedov === 2 || pocetZivychSusedov === 3) {
            // this.stav = 1;
        }
        else if (pocetZivychSusedov > 3) {
            // this.stav = 0;
            this.zmenStav();
        } 
       } else { // jsem mrtvá
        if (pocetZivychSusedov === 3) {
            // this.stav = 1;
            this.zmenStav();
        } 
       }

       return this.stav;
    }

    zmenStav() {
        if (this.stav === 1) {
            this.stav = 0;
        } else {
            this.stav = 1;
        }
    }
    
}
