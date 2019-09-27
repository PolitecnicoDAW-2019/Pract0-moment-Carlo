// Con un array de objectos de empleados { nombre, salario, timezone, fecha y updated_at } queremos varias funciones
// 1. diffDates(date1, date2) devuelve t/f si son la misma fecha
// 2. SumDates(date1, unittimes) suma una unidades de tiempo a un moment que pasamos
// 3. setDateEmployee(name) busca el empleado en el array de objetos y actualiza el string de fecha por un objeto moment según su time zone, además actualizamos update_at
// 4. SumDiffDate sobre el array de empleados sumará la diferencia de fechas que hay entre todos de (1-2, 1-3, 2-3) y devolver un string optimizado en semanas o lo que corresponda

// Warning, no necesitas más de 6 líneas por función

const moment = require('./node_modules/moment');

const DATE_FORMAT = 'DD/MM/YYYY';
const DATE_FORMAT_LONG = 'DD/MM/YYYY HH:mm:ss';


//1. DiffDates
function diffDates(date1, date2) {
    m1 = moment(date1);
    m2 = moment(date2);
    return m1.isSame(m2);
}

console.log(diffDates("04/09/2013 15:00:00","04/09/2013 12:00:50"));

//2. sumDates
function sumDates(date1, minutes, seconds) {
    return date = moment(date1, "hh:mm:ss A")
        .add(seconds, 'seconds')
        .add(minutes, 'minutes')
        .format('LTS');
}

console.log(sumDates("15:00:00", 10, 5));

//3. setDateEmployee

const employees = [
    {
        name: 'Paco',
        timezone: 'Europe/Madrid',
        date: '04/09/2014',
        update_at: ''
    },
    {
        name: 'Alexis',
        timezone: 'America/Los_Angeles',
        date: '05/09/2014',
        update_at: ''
    },
    {
        name: 'Sergio',
        timezone: 'Asia/Tokyo',
        date: '06/09/2014',
        update_at: ''
    }
]

function setDateEmployee(nombre) {
    const employee = employees.find(_employee => _employee.name === nombre);
    const dateAct = moment(employee.date);
    employee.date = dateAct;
    employee.update_at = moment();
    console.log(dateAct);
    console.log(employees);
}

setDateEmployee('Paco');

//4. sumDiffDate

function sumDiffDate() {
    //Hacer un reduce que coja todos los valores y dentro de ese otro reduce que coja cada valor de fuera y lo compare con el resto de valores, para quitar el actual hacemos el slice
    let arrayToWork = employees;
    return employees.reduce((contExt, employeeExt) => {
        setDateEmployee(employeeExt.name);
        arrayToWork = arrayToWork.slice(1);
        contExt += arrayToWork.reduce((contInt, employeeInt) => {
            setDateEmployee(employeeInt.name);
            contInt += Math.abs(employeeExt.date.diff(employeeInt.date, "days"));
            return contInt;
        },0);
        return contExt;
    },0);
}

console.log(sumDiffDate());