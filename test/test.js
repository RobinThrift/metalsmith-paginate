var paginate = require('../'),
    should   = require('should'),
    metalsmith, metadata, files

require('mocha');


files = {
    'blog.md': {
        paginate: 'posts'
    }
}


metadata = {collections: {posts: []}};

for (var i = 1; i <= 10; i++) {
    var name = 'content/posts/post-' + i + '.md';
    files[name] = {
        title: 'Post Number ' + i,
        collection: 'posts'
    };
    metadata.collections.posts.push(files[name]);
}

metalsmith = {
    metadata: function() {
        return metadata;
    }
}

describe('Paginate', function() {

    it('paginate a collection', function(done) {
        paginate({
            perPage: 2
        })(files, metalsmith, function() {
            var cPages = 0;
            for (var file in files) {
                if (/(blog)/.test(file)) {
                    cPages++;
                }
            }
            cPages.should.equal(5);
            done();
        });
    });

});
