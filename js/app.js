new Vue({
    el: '#app',
    data: {
        demiPension: localStorage.getItem('demi-pension'),
        petitDejeun: localStorage.getItem('petit-déjeuné'),
        hebergementSeul: localStorage.getItem('hébergements-seuls'),
        pensionComplete: localStorage.getItem('pension-complète'),
        toutInlcus: localStorage.getItem('Tous-inclus'),
        allInclusive: localStorage.getItem('All-inclusive'),
    },
    methods: {
        DemiPension: function () {
            this.demiPension = 'Oui'
            localStorage.setItem('demi-pension', 'Oui');
        },
        PetitDej: function () {
            localStorage.setItem('hébergements seuls', 'Oui');
        },
    },
})