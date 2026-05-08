import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const API = 'http://localhost:3000';

// Criar PDF de teste
const pdfPath = 'test.pdf';
const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>
endobj
xref
0 4
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
trailer
<< /Size 4 /Root 1 0 R >>
startxref
181
%%EOF`;

fs.writeFileSync(pdfPath, pdfContent);
console.log('✓ PDF de teste criado');

const client = axios.create();

async function test() {
  try {
    // 1. Login
    console.log('\n1️⃣  Login...');
    const loginResp = await client.post(`${API}/login`, {
      email: 'admin@ludus.local',
      password: 'admin123'
    });
    console.log(`  Status: ${loginResp.status}`);
    const cookies = loginResp.headers['set-cookie'];
    if (cookies) console.log(`  Cookies: ${cookies[0].split(';')[0]}`);
    
    // 2. Criar conteúdo com PDF
    console.log('\n2️⃣  Criando conteúdo com PDF...');
    const form = new FormData();
    form.append('titulo', 'Teste GridFS Upload');
    form.append('descricao', 'Conteúdo de teste para validar GridFS');
    form.append('tipo', 'Artigo');
    form.append('arquivo_pdf', fs.createReadStream(pdfPath));
    
    const uploadResp = await client.post(`${API}/api/conteudos`, form, {
      headers: form.getHeaders(),
      withCredentials: true
    });
    
    console.log(`  Status: ${uploadResp.status}`);
    console.log(`  Resposta:`, JSON.stringify(uploadResp.data, null, 2));
    
    if (uploadResp.data.pdf_id) {
      console.log(`\n✅ Sucesso! PDF salvo em GridFS`);
      console.log(`   ID do documento: ${uploadResp.data._id}`);
      console.log(`   pdf_id (GridFS): ${uploadResp.data.pdf_id}`);
      console.log(`   pdf_url: ${uploadResp.data.pdf_url || 'null'}`);
    }
  } catch (err) {
    console.error('❌ Erro:', err.response?.data || err.message);
  } finally {
    fs.unlinkSync(pdfPath);
    process.exit(0);
  }
}

test();
