

new Vue({
    el: '#app',
    data: {
        demiPension: localStorage.getItem('demi-pension'),
        petitDejeun: localStorage.getItem('petit-déjeuné'),
        hebergementSeul: localStorage.getItem('hébergements-seuls'),
        pensionComplete: localStorage.getItem('pension-complète'),
        toutInlcus: localStorage.getItem('Tous-inclus'),
        allInclusive: localStorage.getItem('All-inclusive'),

        demiPensionCount: 0,
        petitDejeunCount: 0,
        hebergementSeulCount: 0,
        pensionCompleteCount: 0,
        toutInlcusCount: 0,
        allInclusiveCount: 0,
    },
    methods: {
        DemiPension: function () {
            this.demiPension = 'Oui'
            this.demiPensionCount++
            localStorage.setItem('demi-pension', 'Oui');
        },
        PetitDej: function () {
            this.petitDejeun = 'Inclus'
            this.petitDejeunCount++
            localStorage.setItem('petit-déjeuné', 'Inclus');
        },
        HebergementSeul: function () {
            this.hebergementSeul = 'Oui'
            this.hebergementSeulCount++
            localStorage.setItem('hébergements-seuls', 'Oui');
        },
        PensionComplete: function () {
            this.pensionComplete = 'Oui'
            this.pensionCompleteCount++
            localStorage.setItem('pension-complète', 'Oui');
        },
        ToutInlcus: function () {
            this.toutInlcus = 'Oui'
            this.toutInlcusCount++
            localStorage.setItem('Tous-inclus', 'Oui');
        },
        AllInclusive: function () {
            this.allInclusive = 'Oui'
            This.allInclusiveCount++
            localStorage.setItem('All-inclusive', 'Oui');
        },
        fetchUsers() {
            this.users = [];

            axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response) => {
                    const data = response.data; // [{}, {}]
                    this.users = data;
                });
        },
    },
})