export type ItemCharterOutput = {
    id: number;
    item: string;
    itemLazer: boolean;
    quantidade: number;
}

export type ItemCharterInput = {
    item: string;
    itemLazer: boolean;
    quantidade: number;
}

export type ItemCharterDb = {
    item_id: number;
    nome_item: string;
    item_lazer: boolean;
    quantidade_item: number;
}
