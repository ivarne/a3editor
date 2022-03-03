import fs from 'fs';
import _path from 'path';
import http2 from 'http2';

/* ... */

async function download( host, query, destination )
{
    return new Promise
    (
        ( resolve, reject ) =>
        {
            // Connect to client:
            const client = http2.connect( host );
            client.on( 'error', error => reject( error ) );

            // Prepare a write stream:
            const fullPath = _path.join( fs.realpathSync( '.' ), destination );
            const file = fs.createWriteStream( fullPath, { flags: "w" } );
            file.on( 'error', error => reject( error ) );

            // Create a request:
            const request = client.request( { ':path': query } );

            // On initial response handle non-success (!== 200) status error:
            request.on
            (
                'response',
                ( headers/*, flags*/ ) =>
                {
                    if( headers[':status'] !== 200 )
                    {
                        file.close();
                        fs.unlink( fullPath, () => {} );
                        reject( new Error( `Server responded with ${headers[':status']}` ) );
                    }
                }
            );

            // Set encoding for the payload:
            request.setEncoding( 'utf8' );

            // Write the payload to file:
            request.on( 'data', chunk => file.write( chunk ) );

            // Handle ending the request
            request.on
            (
                'end',
                () =>
                {
                    file.close();
                    client.close();
                    resolve( { result: true } );
                }
            );

            /* 
                You can use request.setTimeout( 12000, () => {} ) for aborting
                after period of inactivity
            */

            // Fire off [flush] the request:
            request.end();
        }
    );
}
async function downloadSchema(schema){
    let downloaded = await download( 'https://altinncdn.no', `/schemas/json/${schema}`, `src/generated/json-schema/${schema}` );
    
    if( downloaded.result ){
        console.log(`Downloaded ${schema} successfully`)
    }else{
        console.error(`Error downloading ${schema}`)
    }
}
await downloadSchema("layout/layout-sets.schema.v1.json");
await downloadSchema("layout/layout.schema.v1.json");
await downloadSchema("layout/layoutSettings.schema.v1.json");
await downloadSchema("component/number-format.schema.v1.json");
await downloadSchema("prefill/prefill.schema.v1.json");
await downloadSchema("widget/widget.schema.v1.json");