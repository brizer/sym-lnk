const fs = require('fs')
const path = require('path')
const pify = require('pify')

const fsp = {
    symlink:pify(fs.symlink)
}

const addSymlink = async (options={})=>{
    const opts = mergeDefaultOptions(options)
    const configs = opts.configs||[]

    const addSymlinkOne = async (item)=>{
        if(!fs.existsSync(item.path)){
            throw new Error(`path ${item.path} does not exists`)
        }
        const dest = path.resolve(item.path,item.alias)
        if(!opts.force){
            if(fs.existsSync(dest)){
                throw new Error(`${item.alias} symlink is already exists, please use force to update`)
            }
        }
        await fsp.symlink(item.path,item.alias)   
    }


    Promise.all(
        options.configs.map(v=>addSymlink(v))
    )

}



/**
 * merge default options
 */
const mergeDefaultOptions(options=>Object.assign({
        force:false,
        configs:[]
    },options)
}

module.exports = {
    addSymlink
}