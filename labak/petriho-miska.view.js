class Miska {

    domElement;

    rozmer = {
        sirka: undefined,
        vyska: undefined
    };

    bunky = [];

    mrizka;


    constructor(miskaElement, mrizka){
        this.domElement = miskaElement;
        this.rozmer.sirka = this.domElement.getBoundingClientRect().width;
        this.rozmer.vyska = this.domElement.getBoundingClientRect().height;
        console.log('MISKA VYTVORENA');
        this.naplnMiskuBunkami(mrizka);
    }

    naplnMiskuBunkami(mrizka) {
        this.mrizka = mrizka;

        for (var y = 0; y < this.rozmer.vyska; y = y + mrizka) {
            // console.log('y', y);
            for (var x = 0; x < this.rozmer.sirka; x = x + mrizka) {

                var bunka = new Bunka();
                bunka.x = x;
                bunka.y = y;
                this.bunky.push(bunka);
                // this.zobrazBunku(bunka);
            }
        }

        console.log('MISKA NAPLNĚNA');

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
            bunkaElm.classList.add('stav' + bunka.stav);
            bunkaElm.style.width = this.mrizka + 'px';
            bunkaElm.style.height = this.mrizka + 'px';
            bunkaElm.style.position = 'absolute';
            bunkaElm.style.left = bunka.x + 'px';
            bunkaElm.style.top = bunka.y + 'px';
            bunka.domElement = bunkaElm;
            this.domElement.appendChild(bunka.domElement);

            // bunka manual
            bunka.domElement.addEventListener('mouseover', function(e) {
                if (e.buttons) {
                    bunka.zmenStav();
                    bunka.domElement.className = 'bunka'; // reset class
                    bunka.domElement.classList.add('stav' + bunka.stav);
                }
            });
        }
    }

    ukazBunkamSusedy(bunky) {
        var pocetBunekNaRiadok = Math.ceil(this.rozmer.sirka / this.mrizka);
        console.log('pocetBunekNaRiadok', pocetBunekNaRiadok);
        
        for (var i = 0; i < bunky.length; i++) {
            var left            = i - 1;
            var leftTop         = i - pocetBunekNaRiadok - 1;
            var top             = i - pocetBunekNaRiadok;
            var rightTop        = i - pocetBunekNaRiadok + 1;
            var right           = i + 1;
            var rightBottom     = i + pocetBunekNaRiadok + 1;
            var bottom          = i + pocetBunekNaRiadok;
            var leftBottom      = i + pocetBunekNaRiadok - 1;

            left = (left >= 0 ? left : left + bunky.length);
            leftTop = (leftTop >= 0 ? leftTop : leftTop + bunky.length);
            top = (top >= 0 ? top : top + bunky.length);
            rightTop = (rightTop >= 0 ? rightTop : rightTop + bunky.length);
            right = (right < bunky.length ? right : right - bunky.length);
            rightBottom = (rightBottom < bunky.length ? rightBottom : rightBottom - bunky.length);
            bottom = (bottom < bunky.length ? bottom : bottom - bunky.length);
            leftBottom = (leftBottom < bunky.length ? leftBottom : leftBottom - bunky.length);

            /* left = (left < 0 || left >= bunky.length ? left = undefined : left);
            leftTop = (leftTop < 0 || leftTop >= bunky.length ? leftTop = undefined : leftTop);
            top = (top < 0 || top >= bunky.length ? top = undefined : top);
            rightTop = (rightTop < 0 || rightTop >= bunky.length ? rightTop = undefined : rightTop);
            right = (right < 0 || right >= bunky.length ? right = undefined : right);
            rightBottom = (rightBottom < 0 || rightBottom >= bunky.length ? rightBottom = undefined : rightBottom);
            bottom = (bottom < 0 || bottom >= bunky.length ? bottom = undefined : bottom);
            leftBottom = (leftBottom < 0 || leftBottom >= bunky.length ? leftBottom = undefined : leftBottom); */

            bunky[i].susedia = [
                bunky[left],
                bunky[leftTop],
                bunky[top],
                bunky[rightTop],
                bunky[right],
                bunky[rightBottom],
                bunky[bottom],
                bunky[leftBottom]
            ];
        }

        console.log('SOUSEDÉ DEFINOVÁNI');
    }

    nahodnyStavBunky() {
        return Math.floor(Math.random() * 2);
    }
}