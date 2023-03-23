const express = require('express');
const mongoose = require('mongoose');
const studentsController = require('../controllers/school.students.controller');
const inscribirPrimeros = require('../controllers/school.students.primeros');
const materiasController = require('../controllers/school.materias.controller');
const docentesControllers = require('../controllers/school.docentes.controller');
const loginControoler = require('../controllers/school.login.controller');
const segundoController = require('../controllers/school.segundos.controller');

const router = express.Router();


router
.post('/login_school', loginControoler.loginUser)
.post('/signup_school', loginControoler.signUp)

.get('/todos_estudiantes_registrados', loginControoler.validateUrlWithToken, studentsController.todosLosEstudiantesDeLaEscuela)
.post('/registrar_estudiante', loginControoler.validateUrlWithToken, studentsController.inscribirEstudiante)
.put('/actualizar_estudiante_registrado/:id', loginControoler.validateUrlWithToken, studentsController.actualizarEstudianteRegistrado)
.delete('/eliminar_estudiante_registrado/:id', loginControoler.validateUrlWithToken, studentsController.eliminarEstudianteRegistrado)


.get('/todos_estudiantes_primero_A', loginControoler.validateUrlWithToken, inscribirPrimeros.todosLosEstudiantesDePrimeroA)
.post('/inscribir_primer_A', loginControoler.validateUrlWithToken, inscribirPrimeros.inscribirEnPimeroA)
.post('/actualizar_estudiantes_primer_a', loginControoler.validateUrlWithToken, inscribirPrimeros.actualizarEstudiantePrimeroA)
.delete('/delete_students_primero_A/:userId', loginControoler.validateUrlWithToken, inscribirPrimeros.eliminarEstudianteDePrimeroA)

.get('/todas_las_materias', loginControoler.validateUrlWithToken, materiasController.todasLasMaterias)
.post('/agregar_materia', loginControoler.validateUrlWithToken, materiasController.agregarMaterias)
.put('/actualizar_materia/:id', loginControoler.validateUrlWithToken, materiasController.actualizarMaterias)
.delete('/eliminar_materia/:id', loginControoler.validateUrlWithToken, materiasController.eliminarMateria)

.get('/todos_docentes', loginControoler.validateUrlWithToken,  docentesControllers.todosLosDocentes)
.post('/registrar_docente', loginControoler.validateUrlWithToken, docentesControllers.registrarDocentes)
.put('/actualizar_docente/:id', loginControoler.validateUrlWithToken, docentesControllers.actualizarDocentes )
.delete('/eliminar_docente/:id', loginControoler.validateUrlWithToken,  docentesControllers.eliminarDocente)


.get('/todos_los_estudiantes_segundo', loginControoler.validateUrlWithToken, segundoController.todosLosEstudiantesSegundo)
.post('/inscribir_seundo', loginControoler.validateUrlWithToken, segundoController.inscribirEstudianteEnSegundo)
.post('/actualizar_estudiante_segundo', loginControoler.validateUrlWithToken, segundoController.actualizarEstudianteSegundoA)
.delete('/eliminar_estudiante_segundo/:userId', loginControoler.validateUrlWithToken, segundoController.eliminarEstudianteDeSegundoA)



module.exports = router;
