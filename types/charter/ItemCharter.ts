export type ItemCharterList = {
    id: number;
    item: string;
    itemLazer: boolean;
}


export type ItemCharter = {
    id: number;
    item: string;
    itemLazer: boolean;
    quantidade: number;
}



export type ItemCharterDbAll = {
    id: number;
    item: string;
    item_lazer: boolean;
}

export type ItemCharterDb = {
    item_id: number;
    nome_item: string;
    item_lazer: boolean;
    quantidade_item: number;
}
