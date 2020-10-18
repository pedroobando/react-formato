import { typeVehiculo } from '../types/types';

const initialState = {
  vehiculos: [],
  active: null,
};

export const vehiculoReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeVehiculo.setActive:
      return {
        ...state,
        active: state.vehiculos.find((element) => element.rowId === action.payload),
      };

    case typeVehiculo.addNew:
      return {
        ...state,
        vehiculos: [action.payload, ...state.vehiculos],
      };

    case typeVehiculo.clearActive:
      return {
        ...state,
        active: null,
      };

    case typeVehiculo.updated:
      return {
        ...state,
        vehiculos: state.vehiculos.map((e) =>
          e.rowId === action.payload.rowId ? action.payload : e
        ),
      };

    case typeVehiculo.deleted:
      return {
        ...state,
        vehiculos: state.vehiculos.filter((e) => e.rowId !== state.active.rowId),
        active: null,
      };

    case typeVehiculo.loaded:
      return {
        ...state,
        vehiculos: [...action.payload],
      };

    case typeVehiculo.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
