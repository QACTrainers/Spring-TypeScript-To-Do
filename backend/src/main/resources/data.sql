-- Insert Categories
INSERT INTO category (name) VALUES 
    ('Work'),
    ('Personal'),
    ('Shopping'),
    ('Health'),
    ('Learning');

-- Insert Todos
INSERT INTO todo (text, description, completed, due_date) VALUES 
    ('Complete project presentation', 'Prepare and finalize the quarterly project presentation for stakeholders', false, TIMESTAMP '2025-03-01 14:00:00'),
    ('Buy groceries', 'Get weekly groceries including fruits, vegetables, and household items', false, TIMESTAMP '2025-02-26 18:00:00'),
    ('Schedule dentist appointment', 'Book regular checkup and cleaning appointment', false, TIMESTAMP '2025-02-28 12:00:00'),
    ('Exercise for 30 minutes', 'Daily cardio workout routine', false, TIMESTAMP '2025-02-25 09:00:00'),
    ('Pay utility bills', 'Pay electricity, water, and internet bills for the month', false, TIMESTAMP '2025-03-05 23:59:59'),
    ('Read technical documentation', 'Review and understand the new API documentation', false, TIMESTAMP '2025-03-10 17:00:00'),
    ('Clean the house', 'Weekly house cleaning including vacuuming and dusting', false, TIMESTAMP '2025-02-20 15:00:00');

-- Link Todos with Categories
INSERT INTO todo_categories (todo_id, category_id) VALUES 
    (1, 1),  -- Work: Complete project presentation
    (2, 3),  -- Shopping: Buy groceries
    (3, 2),  -- Personal: Schedule dentist appointment
    (3, 4),  -- Health: Schedule dentist appointment
    (4, 4),  -- Health: Exercise
    (4, 2),  -- Personal: Exercise
    (5, 2),  -- Personal: Pay bills
    (6, 1),  -- Work: Read documentation
    (6, 5),  -- Learning: Read documentation
    (7, 2);  -- Personal: Clean the house

-- Insert Subtasks
INSERT INTO todo_subtasks (todo_id, subtask_order, subtask) VALUES
    (1, 0, 'Gather project metrics'),
    (1, 1, 'Create presentation slides'),
    (1, 2, 'Review with team'),
    (1, 3, 'Practice presentation'),
    (2, 0, 'Make shopping list'),
    (2, 1, 'Check for coupons'),
    (2, 2, 'Visit grocery store'),
    (7, 0, 'Vacuum all rooms'),
    (7, 1, 'Dust furniture'),
    (7, 2, 'Clean bathrooms'),
    (7, 3, 'Mop floors');
