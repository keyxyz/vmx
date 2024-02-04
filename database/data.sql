INSERT INTO `users` 
    (`name`, `email`, `password`, `role`) 
VALUES
    ('Brad', 'brad@test.com', '$2b$10$XRoEPdT.7umsa9eejFQfOOVsNRb84orLsARnBsyg7fLG5TzVQNDwq', '2'),
    ('John', 'john@doe.me', '$2b$10$7grgkbC9zUbtD4BCnjJ.0eXiSaJmLCRrGOIvNhHuWDhhMrdtaHkri', '1');

INSERT INTO `categories` 
    (`title`, `description`, `image`, `published`)
VALUES
    ('Web Development', 'Learn web technologies', 'default.png', '1'),
    ('Artificial Intelligence', 'Learn how AI works', 'default.png', '1'),
    ('Microsoft 365', 'Office automation made easy', 'default.png', '1'),
    ('Computerized Accounting', 'Accounting demistified', 'default.png', '0'),
    ('Software Engineering', 'Learn software management and programming concepts', 'default.png', '1'),
    ('Graphics Design', 'Create digital products', 'default.png', '1'),
    ('3D Designing', 'Build 3D software products ', 'default.png', '0');

INSERT INTO `courses` 
    (`category`, `title`, `description`, `image`, `level`, `pricing`, `published`)
VALUES
    ('5', 'Hello Java', 'Learn Java','default.png', '1', '2', '1'),
    ('1', 'Hello JS', 'Learn JavaScript', 'default.png', '1', '1', '0'),
    ('5', 'Hello V', 'Learn V', 'default.png', '3', '2', '1'),
    ('2', 'Hello Python', 'Learn Python', 'default.png', '2', '2', '0'),
    ('3', 'MS Excel', 'Learn spreadsheet software', 'default.png', '2', '1', '1'),
    ('3', 'MS Word', 'Learn document processing', 'default.png', '2', '1', '1'),
    ('1', 'Hello PHP', 'Learn PHP', 'default.png', '3', '1', '1'),
    ('1', 'Hello Laravel', 'Learn Laravel', 'default.png', '2', '2', '1'),
    ('1', 'The AHA Stack', 'Build Fullstack Apps', 'default.png', '3', '2', '1');

INSERT INTO `sections` (`course`, `title`, `order`)
VALUES
    ('1', 'Introduction', '1'),
    ('1', 'Concepts', '2'),
    ('1', 'Project', '3'),
    ('1', 'Summary', '4'),

    ('2', 'Introduction', '1'),
    ('2', 'Concepts', '2'),
    ('2', 'Project', '3'),
    ('2', 'Summary', '4'),

    ('3', 'Introduction', '1'),
    ('3', 'Concepts', '2'),
    ('3', 'Project', '3'),
    ('3', 'Summary', '4'),

    ('4', 'Introduction', '1'),
    ('4', 'Concepts', '2'),
    ('4', 'Project', '3'),
    ('4', 'Summary', '4'),

    ('5', 'Introduction', '1'),
    ('5', 'Concepts', '2'),
    ('5', 'Project', '3'),
    ('5', 'Summary', '4');