"use strict";

import Bunka from './bunka.model.js';

class Miska {

    constructor(miskaElement, mrizka){
        const self = this;
        self.bunky = [];
        self.rozmer = {
            sirka: undefined,
            vyska: undefined
        }
        self.mrizka = mrizka;
        self.domElement = miskaElement;
        self.rozmer.sirka = self.domElement.getBoundingClientRect().width;
        self.rozmer.vyska = self.domElement.getBoundingClientRect().height;
        // console.log('MISKA VYTVORENA');
        self.naplnMiskuBunkami(mrizka);

        /////////////////////////////////////////////
        // kreslení / změna stavu buněk uživatelem
        /////////////////////////////////////////////
        // mobile
        self.domElement.addEventListener('touchmove', function(event) {
            const clientX = event.touches[0].clientX;
            const clientY = event.touches[0].clientY;
            const bunkaElement = document.elementFromPoint(clientX, clientY);
            const bunka = bunkaElement.bunka;
            // process
            bunka.zmenStav(function(stav){
                self.zobrazBunku(bunka);
            });
            // todo: smooth
        }, true);

        /////////////////////////////////////////////
        // desktop
        self.domElement.addEventListener('mouseover', function(e) {
            if (e.buttons) {
                let bunka = e.srcElement.bunka;
                // process
                bunka.zmenStav(function(stav){
                    self.zobrazBunku(bunka);
                });
            }
        });
    }

    naplnMiskuBunkami(mrizka) {
        for (var y = 0; y < this.rozmer.vyska; y = y + mrizka) {
            for (var x = 0; x < this.rozmer.sirka; x = x + mrizka) {
                var bunka = new Bunka();
                bunka.id = x + y;
                bunka.x = x;
                bunka.y = y;
                this.bunky.push(bunka);
            }
        }
        // console.log('MISKA NAPLNĚNA');
        this.ukazBunkamSusedy(this.bunky);
    }

    zobrazBunku(bunka) {
        // bunka je jiz zobrazena
        if (bunka.domElement) {
            bunka.domElement.className = 'bunka'; // reset class
            bunka.domElement.classList.add('stav' + bunka.stav);
        // nova bunka
        } else {
            var bunkaElm = document.createElement('div');
            bunkaElm.className = 'bunka';
            bunkaElm.id = 'b' + bunka.id;
            bunkaElm.classList.add('stav' + bunka.stav);
            bunkaElm.style.width = this.mrizka + 'px';
            bunkaElm.style.height = this.mrizka + 'px';
            bunkaElm.style.position = 'absolute';
            bunkaElm.style.left = bunka.x + 'px';
            bunkaElm.style.top = bunka.y + 'px';
            bunka.domElement = bunkaElm;
            bunka.domElement.bunka = bunka;
            this.domElement.appendChild(bunka.domElement);
        }
    }

    ukazBunkamSusedy(bunky) {

        var pocetBunekNaRiadok = Math.ceil(this.rozmer.sirka / this.mrizka);
        
        for (var i = 0; i < bunky.length; i++) {
            var leftIndex            = i - 1;
            var leftTopIndex         = i - pocetBunekNaRiadok - 1;
            var topIndex             = i - pocetBunekNaRiadok;
            var rightTopIndex        = i - pocetBunekNaRiadok + 1;
            var rightIndex           = i + 1;
            var rightBottomIndex     = i + pocetBunekNaRiadok + 1;
            var bottomIndex          = i + pocetBunekNaRiadok;
            var leftBottomIndex      = i + pocetBunekNaRiadok - 1;

            // nekonečný prostor (so so => potřeba doladit)
            leftIndex               = (leftIndex >= 0 ? leftIndex : leftIndex + bunky.length);
            leftTopIndex            = (leftTopIndex >= 0 ? leftTopIndex : leftTopIndex + bunky.length);
            topIndex                = (topIndex >= 0 ? topIndex : topIndex + bunky.length);
            rightTopIndex           = (rightTopIndex >= 0 ? rightTopIndex : rightTopIndex + bunky.length);
            rightIndex              = (rightIndex < bunky.length ? rightIndex : rightIndex - bunky.length);
            rightBottomIndex        = (rightBottomIndex < bunky.length ? rightBottomIndex : rightBottomIndex - bunky.length);
            bottomIndex             = (bottomIndex < bunky.length ? bottomIndex : bottomIndex - bunky.length);
            leftBottomIndex         = (leftBottomIndex < bunky.length ? leftBottomIndex : leftBottomIndex - bunky.length);

            bunky[i].susedia = [
                bunky[leftIndex],
                bunky[leftTopIndex],
                bunky[topIndex],
                bunky[rightTopIndex],
                bunky[rightIndex],
                bunky[rightBottomIndex],
                bunky[bottomIndex],
                bunky[leftBottomIndex]
            ];
        }
        // console.log('SOUSEDÉ DEFINOVÁNI');
    }
}

// export
export default Miska;