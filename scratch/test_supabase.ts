import { supabase } from './src/lib/supabase';

async function testList() {
  const { data, error } = await supabase.storage
    .from('luxury house')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });
  
  if (error) {
    console.error('Error listing files:', error);
  } else {
    console.log('Files found:', data);
  }
}

testList();
