

export interface Passanger {
    name: string;
    children?: string[];
}

const passanger1: Passanger = {
    name: 'Iván',
}

const passanger2: Passanger = {
    name: 'Míriam',
    children: ['Marina','Bernat'],
}

const printChildren = (passanger: Passanger): number => {

    const howManyChildren = passanger.children?.length || 0;
    // const howManyChildren = passanger.children!.length;
    
    console.log(passanger.name,howManyChildren);

    return howManyChildren

}

printChildren(passanger1);
printChildren(passanger2);
