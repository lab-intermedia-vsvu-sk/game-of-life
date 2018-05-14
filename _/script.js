// formální jazyk
// syntaxe, sémantika
// algoritmus
// typografie
// návrhový vzor

// syntaxe, sémantika
    // proměnná (string, number, boolean, array, object)
    // funkce
    var penezenka = 'peněženka';
    var vlastnici = ['Tomáš', 'Boris', 'Dodo', 'Tatiana', 'Viktoria', 'Robinco'];
    var pocetOsob = 7;
    var odchazeni = setInterval(odchodOsoby, 100);
    var ukradeno = false;

    function ukrast(co, komu) {
        console.log('urkast ' + co + ' ' + komu);
        ukradeno = true;
    }
    
    function checkujProstor() {
        if ( pocetOsob === 0 ) {
            
            for (var i = 0; i < vlastnici.length; i++) {
                ukrast(penezenka, vlastnici[i]);
            }

        } else {
            setTimeout( checkujProstor, 0);
        }
    }

    function odecti(ponozky, nohavice) {
        return (ponozky + nohavice);
    }

    // setci(10, 9);

   /*  function rekurze() {
        rekurze();
    }
    rekurze(); */

    function odchodOsoby() {
        if ( pocetOsob === 0) {
            clearInterval(odchazeni);
            return;
        } else {
            pocetOsob--;
        }
        console.log('počet osob', pocetOsob);
    }
    
    checkujProstor();