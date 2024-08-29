import { con } from "../database/db.js";

export const validateTaskData = (title, description, isComplete) => {
    if (typeof title !== 'string' || title.trim() === '' || title.length > 255) {
        return { valid: false, message: 'El titulo debe ser una cadena no vacía de un máximo de 255 caracteres' };
    }
    if (typeof description !== 'string' || description.trim() === '') {
        return { valid: false, message: 'La descripción debe ser una cadena no vacía.' };
    }
    if (typeof isComplete !== 'boolean') {
        return { valid: false, message: 'isComplete debe ser un valor booleano.' };
    }
    return { valid: true };
}

export const getTasks = async (_req, res) => {
    try {
        const [results] = await con.query('SELECT * FROM tasks');
        return res.status(200).json(results);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener tareas' });
    } 
};

export const addTasks = async (req, res) => {
    const { title, description, isComplete } = req.body;

    const validation = validateTaskData(title, description, isComplete);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    try {
        const [ results ] = await con.execute(`INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)`, [title, description, isComplete])

        const [ taskFound ] = await con.execute("SELECT * FROM tasks WHERE id = ?", [results.insertId])

        return res.status(201).json(taskFound[0])
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al añadir tarea' });

    } 
};
export const getById = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        console.log(id)
        return res.status(400).json({ error: 'id no válido' }) 
        
    }

    try {
        const [results] = await con.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};


export const deleteTasks = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'id no válido' });
    }

    try {
       
        const [results] = await con.execute('DELETE FROM tasks WHERE id = ?', [id]);

        if(results.affectedRows == 0 ){
            return res.status(404).json({message: "La tarea no existe"})
        } 

        res.status(200).json({
            message: "Tarea eliminada"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al eliminar tarea' });
    }
};

export const editTasks = async (req, res) => {
    const id = parseInt(req.params.id);

    const { title, description, isComplete } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'id no válido' });
    }

    const validation = validateTaskData(title, description, isComplete);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    try {
        const [results] = await con.execute('UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?', [title, description, isComplete, id]);

        if(results.affectedRows === 0 ){
            return res.status(404).json({message: "La tarea no existe"})
        }

        const [ taskFound ] = await con.execute("SELECT * FROM tasks WHERE id = ?", [id])
        
        res.status(200).json(taskFound);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al editar tarea' });
    }
}; 


 