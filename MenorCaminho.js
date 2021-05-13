// Algoritmo 2

const matriz = [[ 0, 2, 0, 0, 3, 0, 0, 0 ],
                [ 2, 0, 0, 8, 0, 9, 6, 0 ],
                [ 0, 0, 0, 8, 0, 3, 7, 0 ],
                [ 0, 8, 0, 0, 0, 0, 0, 6 ],
                [ 3, 0, 0, 0, 0, 0, 5, 9 ],
                [ 0, 9, 3, 0, 0, 0, 4, 5 ],
                [ 0, 6, 7, 0, 5, 4, 0, 0 ],
                [ 0, 0, 0, 6, 9, 5, 0, 0 ]];

const rotasPosiveis = (posicaoAtual, beforePaths = []) => {
    return matriz[posicaoAtual]
            .map((peso, posicao) => ({ peso, posicao, beforePaths: [...beforePaths] }))
            .filter(val => val.peso 
                && beforePaths.every(path => val.posicao != path.posicao));
}

const rotasGerais = (final, rota = { peso: 0, beforePaths: [], posicao: 0, pesoTotal: 0 }, ignorar = []) => {
    return rotasPosiveis(rota.posicao, ignorar)
            .map((val) => {
                const newValue = { ...val };
                newValue.beforePaths.push(rota);
                newValue.pesoTotal = newValue.peso + rota.pesoTotal;
                if (newValue.posicao == final) return newValue;
                const retorno = rotasGerais(final, newValue, newValue.beforePaths);
                if (retorno.length) return retorno;
                else return newValue;
            });        
}

const exec = final => {
    const caminhosPosiveis = rotasGerais(final)
        .flat(Infinity)
        .filter(val => val.posicao == final);

    const minValuePath = Math.min(...caminhosPosiveis.map(({ pesoTotal }) => pesoTotal));

    const caminhoFinal = caminhosPosiveis.find(({ pesoTotal }) => pesoTotal == minValuePath);

    const path = caminhoFinal
        .beforePaths
        .map(path => path.posicao)
        .join('-')
        .concat(`-${caminhoFinal.posicao}`)
    
    return `Vertex, Cost, Path -> ${final}, ${caminhoFinal.pesoTotal}, ${path}`;

}

(() => {
    const final = process.argv.slice(2)[0];
    console.log(final
            ? exec(final)
            : 'Passe um valor para busca, exemplo:   node MenorCaminho.js <valor de 1 a 7>');
})();