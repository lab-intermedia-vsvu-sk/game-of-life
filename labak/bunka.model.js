"use strict";

class Bunka {
    // konstruktor
    constructor(/* TODO: stavy */){
        this.id;
        this.domElement;
        this.stav;
        this.x;
        this.y;
        this.stari = 0; // stáří buňky
    }
    // metody třídy
    zhodnotSvouSituaci() { // [0, 1, 1, 0, 0, 1, 1, 0]
        let ziviSusedia = 0;
        const susedia = this.susedia;

        if (susedia && susedia.length > 0) {
            // console.log('susedia length', susedia.length);
            for (let i = 0; i < susedia.length; i++) {
                if (susedia[i].stav) {
                    ziviSusedia++;
                }
            }
            return this.rozhodnuti(ziviSusedia);
        } 
    }

    
    // TODO: init bunka s pravidly
    // ROZHODNUTI, CO SE SVÝM ŽIVOTEM
    rozhodnuti(pocetZivychSusedov) {
        /* 
        1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        2. Any live cell with two or three live neighbours lives on to the next generation.
        3. Any live cell with more than three live neighbours dies, as if by overpopulation.
        4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        */
       if (this.stav === 1) { // jsem živá
        if (pocetZivychSusedov < 2) {
            return 0;
        }
        else if (pocetZivychSusedov === 2 || pocetZivychSusedov === 3) {
            return 1;
        }
        else if (pocetZivychSusedov > 3) {
            return 0;
        } 
       } else { // jsem mrtvá
        if (pocetZivychSusedov === 3) {
            return 1;
        } else {
            return this.stav; // vrať současný stav, beze změny
        }
       }
    }

    zmenStav() {
        if (this.stav === 1) {
            this.stav = 0;
        } else {
            this.stav = 1;
        }
        this.stari++;
    }
    
}
