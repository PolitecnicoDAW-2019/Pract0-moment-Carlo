// Con un array de objectos de empleados { nombre, salario, timezone, fecha y updated_at } queremos varias funciones
// 1. diffDates(date1, date2) devuelve t/f si son la misma fecha
// 2. SumDates(date1, unittimes) suma una unidades de tiempo a un moment que pasamos
// 3. setDateEmployee(name) busca el empleado en el array de objetos y actualiza el string de fecha por un objeto moment según su time zone, además actualizamos update_at
// 4. SumDiffDate sobre el array de empleados sumará la diferencia de fechas que hay entre todos de (1-2, 1-3, 2-3) y devolver un string optimizado en semanas o lo que corresponda

// Warning, no necesitas más de 6 líneas por función

/*
import { add, subs }  from 'moment'; 
export function less (){

}

//node  (backend)

require

// JavaScript (browser)  (Patron módulo revelado)
(function module () {

    return {
        functionExport: functionExport,
    }
})()

*/

const moment = require('moment-timezone');

const DATE_FORMAT = 'DD/MM/YYYY';
const DATE_FORMAT_LONG = 'DD/MM/YYYY HH:mm:ss';

function assert(value1, value2) {
  if (value1 !== value2) {
    throw new Error('ERROR: ASSERT');
  }
}

//1. DiffDates
function diffDates(date1, date2) {
  /*  const [m1, m2] = [moment(date1), moment(date2)]; */
  const m1 = moment(date1, DATE_FORMAT_LONG);
  const m2 = moment(date2, DATE_FORMAT_LONG);
  return m1.isSame(m2);
}

assert(diffDates('04/09/2013 15:00:00', '04/09/2013 12:00:50'), false);
assert(diffDates('04/09/2013 15:00:00', '04/09/2013 15:00:00'), true);

function diffDatesMoment(m1, m2) {
  return m1.isSame(m2);
}

assert(
  diffDatesMoment(
    moment('04/09/2013 15:00:00', DATE_FORMAT_LONG),
    moment('04/09/2013 12:00:50', DATE_FORMAT_LONG)
  ),
  false
);
assert(
  diffDatesMoment(
    moment('04/09/2013 15:00:00', DATE_FORMAT_LONG),
    moment('04/09/2013 15:00:00', DATE_FORMAT_LONG)
  ),
  true
);

//2. sumDates
/* function sumDates(date1, minutes, seconds) {
  return (date = moment(date1, 'hh:mm:ss A')
    .add(seconds, 'seconds')
    .add(minutes, 'minutes')
    .format('LTS'));
}
 */

// unitTimes: ['3d', '4w', '10m']
function sumDate(date, unitTimes) {
  const m1 = date.clone();
  return unitTimes.reduce((m1, unitTime) => {
    const symbol = unitTime.slice(-1);
    const number = unitTime.slice(0, unitTime.length - 1);
    m1.add(number, symbol);
    return m1;
  }, m1);
}

/* 
{
    number: 10,
    symbol: 'd'
}
 */
//console.log(sumDate(moment('15:00:00', 'hh:mm:ss'), ['10m', '1d', '5s']));

//console.log(sumDates("15:00:00", 10, 5));

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
    date: '07/09/2014',
    update_at: ''
  }
];

/* function setDateEmployee(name) {
  const employee = employees.find(_employee => _employee.name === name);
  const dateAct = moment(employee.date);
  employee.date = dateAct;
  employee.update_at = moment().unix();
  console.log(dateAct);
  console.log(employees);
} */

//setDateEmployee('Paco');

/* const newYork = moment.unix(1569583517).tz('America/New_York');
const losAngeles = newYork.clone().tz('America/Los_Angeles');
const london = newYork.clone().tz('Europe/London');

console.log(newYork.format()); // 2014-06-01T12:00:00-04:00
console.log(losAngeles.format()); // 2014-06-01T09:00:00-07:00
console.log(london.format()); // 2014-06-01T17:00:00+01:00
 */
//4. sumDiffDate

const employeesWithMoment = employees.map(employee => ({
  ...employee,
  date: moment(employee.date, DATE_FORMAT_LONG)
}));

function sumDiffDate() {
  //Hacer un reduce que coja todos los valores y dentro de ese otro reduce que coja cada valor de fuera y lo compare con el resto de valores, para quitar el actual hacemos el slice
  return employeesWithMoment.reduce((acc, employee, index) => {
    const employeeAfter = employeesWithMoment.slice(index + 1);
    return (
      acc +
      employeeAfter.reduce(
        (sum, _employeeAfter) =>
          sum + Math.abs(employee.date.diff(_employeeAfter.date, 'd')),
        0
      )
    );
  }, 0);
}

console.log(sumDiffDate());

/* let arrayToWork = employees;
  return employees.reduce((contExt, employeeExt) => {
    setDateEmployee(employeeExt.name);
    arrayToWork = arrayToWork.slice(1);
    contExt += arrayToWork.reduce((contInt, employeeInt) => {
      setDateEmployee(employeeInt.name);
      contInt += Math.abs(employeeExt.date.diff(employeeInt.date, 'days'));
      return contInt;
    }, 0);
    return contExt;
  }, 0);
} */
