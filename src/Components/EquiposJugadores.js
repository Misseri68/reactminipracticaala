import React, { Component } from "react";
import Global from "../Global";
import axios from "axios";

export default class EquiposJugadores extends Component {
  textInput = React.createRef();
  selectRef = React.createRef();

  constJugadores = []

  state = {
    equipos: [],
    jugadores: [],
  };

  filtrarJugadores = () => {
    var textoBuscado = '';
    textoBuscado = this.textInput.current.value
    console.log(textoBuscado)
    const url = Global.urlEquipos + 'api/Jugadores/FindJugadores/' + textoBuscado;
    console.log(url)
    axios.get(url).then(response => {
        this.setState({jugadores: response.data})
    })

  };

  cargarEquipos = () => {
    const url = Global.urlEquipos + "api/equipos";
    console.log(url);
    axios.get(url).then((response) => {
      this.setState({ equipos: response.data});
    }); //Hasta aquí todo bien
  };

  componentDidMount() {
    this.cargarEquipos();
  }

  cargarJugadoresPorEquipo = () => {
    const equipoSeleccionado = this.selectRef.current.value;
    const url =
      Global.urlEquipos +
      "api/Jugadores/JugadoresEquipos/" +
      equipoSeleccionado;
    axios.get(url).then((response) => {
      this.setState({
        jugadores: response.data
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Mini Practica React</h1>
        <div>
          <label>Nombre de Jugador: </label>
          <br />
          <input type="text" ref={this.textInput} />
          <br />
          <br />
          <button onClick={this.filtrarJugadores}>Buscar Jugador</button>
          <br />
        </div>
        <hr />

        <select ref={this.selectRef}>
          {this.state.equipos.map((equipo, index) => (
            <option key={index} value={equipo.idEquipo}>
              {equipo.nombre}
            </option>
          ))}
        </select>
        <button onClick={this.cargarJugadoresPorEquipo}>
          Seleccionar Equipo
        </button>
        {this.state.jugadores.length > 0 && (
          <table border="3">
            <thead>
              <tr>
                <td>Imagen</td>
                <td>Nombre</td>
                <td>Posicion</td>
                <td>Pais</td>
                <td>Fecha de Nacimiento</td>
              </tr>
            </thead>
            <tbody>
                {
                    this.state.jugadores.map((jugador, index) => { 
                        return(
                        <tr key={index}>
                            <td><img max-width="200px" height="200px"  src={jugador.imagen}/></td>
                            <td>{jugador.nombre}</td>
                            <td>{jugador.posicion}</td>
                            <td>{jugador.pais}</td>
                            <td>{jugador.fechaNacimiento}</td>
                        </tr>
                        )
                    })
                }
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
