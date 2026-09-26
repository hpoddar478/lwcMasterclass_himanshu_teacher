import { LightningElement } from 'lwc';

export default class UseCaseOne extends LightningElement {

    searchText = '';
    category = 'ALL';
    sortBy = 'NAME_ASC';

    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Category', fieldName: 'category' },
        { label: 'Score', fieldName: 'score', type: 'number' }
    ];

    items = [
        { id: '1', name: 'LWC Masterclass', category: 'Learning', score: 85 },
        { id: '2', name: 'Everything AI', category: 'Learning', score: 92 },
        { id: '3', name: 'Workout', category: 'Lifestyle', score: 80 },
        { id: '4', name: 'Eating Habits', category: 'Lifestyle', score: 72 },
        { id: '5', name: 'Promotion', category: 'Career', score: 88 }
    ];

    get categoryOptions(){
        return [
            { label: 'All', value: 'ALL' },
            { label: 'Learning', value: 'Learning' },
            { label: 'Lifestyle', value: 'Lifestyle' },
            { label: 'Career', value: 'Career' }
        ];
    }

    get sortOptions(){
        return [
            {label: 'Name [A-Z]', value: 'NAME_ASC'},
            {label: 'Name [Z-A]', value: 'NAME_DESC'}
        ];
    }

    handleSearch(event){
        this.searchText = event.target.value;
    }

    handleCategory(event){
        this.category = event.detail.value;
    }

    handleSort(event){
        this.sortBy = event.detail.value;
    }

    get filteredData(){
        const textToSearch = (this.searchText || '').toLowerCase();
        let result = this.items.filter(item => {
            const textMatch = item.name.toLowerCase().includes(textToSearch);
            const categoryMatch = this.category === 'ALL' || item.category == this.category;

            return textMatch && categoryMatch;
        });
        

        result = [...result].sort((a,b) => { 
            switch(this.sortBy){
                case 'NAME_ASC':
                    return a.name.localeCompare(b.name);
                case 'NAME_DESC':
                    return b.name.localeCompare(a.name);
            }
        });

        return result;
    }
}