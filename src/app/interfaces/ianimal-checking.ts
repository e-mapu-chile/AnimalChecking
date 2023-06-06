
export interface eventoLote {
    diio: string,
    nombreLote: string,
    ubicacionLote: string,
    usuarioId: number,
    empresaId: number,
    pesoKg: number,
    latitud: string,
    longitud: string
}

export interface registroEnfermedad {
    diio: string,
    enfermedad: string,
    contieneEnfermedad: string,
    eventoLoteId: number,
    usuarioId: number,
    empresaId: number,
    latitud: string,
    longitud: string
}

export interface registroSanitario {
    diio: string,
    animalId?: number,
    parto: string,
    aborto: string,
    traumatismo: string,
    parteCuerpo: string,
    descorne: string,
    castracion: string,
    tecnicaCastracion?: string,
    observacionSanitaria: string,
    eventoLoteId: number,
    usuarioId: number,
    empresaId: number,
    latitud: string,
    longitud: string
}

export interface medicamentoDto {
    nombre: string,
    tipoMedicamento: string,
    presentacion: string,
    dosis: string,
    recetaNumero: number,
}

export interface registroMedicamento {
    diio: string,
    medicamentoNombre: string,
    tipoMedicamento: string,
    presentacion: string,
    dosis: string,
    recetaNumero: number,
    usuarioId: number,
    empresaId: number,
    eventoLoteId: number,
    latitud: string,
    longitud: string
}

export interface registroAlimentacion {
    diio: string,
    tipoAlimento: string,
    unidadesAplicadas: number,
    usuarioId: number,
    empresaId: number,
    eventoLoteId: number,
    latitud: string,
    longitud: string
}

export interface animalInsertarBD {
    diio: string;
    registroLoteEvento: eventoLote;
    registroEnfermedades: registroEnfermedad[];
    registroSanitario: registroSanitario;
    registroMedicamentos: registroMedicamento[];
    registroAlimentacion: registroAlimentacion;
}


export interface animal {
    diio: string;
    latitud: string;
    longitud: string;
    // registroLoteEvento: eventoLote;
    // registroEnfermedades: registroEnfermedad[];
    // registroSanitario:registroSanitario;
    // registroMedicamentos:registroMedicamento[];
    // registroAlimentacion: registroAlimentacion;
}

