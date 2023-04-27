import { rm } from 'fs/promises'
import { join } from 'path';

global.beforeEach(async () => {
    try {
        rm(join(__dirname, '../test.sqlite'));
    } catch (err) {}
})

