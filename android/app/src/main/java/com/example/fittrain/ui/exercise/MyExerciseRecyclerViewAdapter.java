package com.example.fittrain.ui.exercise;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.fittrain.R;
import com.example.fittrain.model.ExerciseResponse;

import java.util.List;


public class MyExerciseRecyclerViewAdapter extends RecyclerView.Adapter<MyExerciseRecyclerViewAdapter.ViewHolder> {

    private final List<ExerciseResponse> mValues;
    private Context ctx;
    String jwt;


    public MyExerciseRecyclerViewAdapter(Context context, List<ExerciseResponse> exercises) {
        mValues = exercises;
        ctx=context;

    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_exercise, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        //jwt = UtilToken.getToken(ctx);
        if (holder.mItem.getGif()!=null){
            Glide
                    .with(ctx)
                    .load(holder.mItem.getGif())
                    .centerCrop()
                    .into(holder.imageViewGif);
        }else{
            Glide
                    .with(ctx)

                    .load("https://www.eecs.utk.edu/wp-content/uploads/2016/02/Symonds_EECS.jpg")
                    .centerCrop()
                    .into(holder.imageViewGif);
        }
        String seriesRepetitions = String.valueOf(holder.mItem.getSeries());
        seriesRepetitions = seriesRepetitions+" x ";
        seriesRepetitions = seriesRepetitions+String.valueOf(holder.mItem.getRepetitions());
        holder.textViewSeriesRepetitions.setText(seriesRepetitions);
        holder.textViewTitle.setText(holder.mItem.getName());
        /* holder.mItem = mValues.get(position);
        jwt = UtilToken.getToken(ctx);
        if (holder.mItem.getPicture()!=null){
            Glide
                    .with(ctx)
                    .load(holder.mItem.getPicture())
                    .centerCrop()
                    .into(holder.imageViewPicture);
        }else{
            Glide
                    .with(ctx)

                    .load("https://www.eecs.utk.edu/wp-content/uploads/2016/02/Symonds_EECS.jpg")
                    .centerCrop()
                    .into(holder.imageViewPicture);
        }
        String size = String.valueOf(holder.mItem.getExercises().size());
        holder.textViewTotalExercises.setText(String.valueOf(holder.mItem.getExercises().size()));
        holder.textViewTitle.setText(holder.mItem.getName().toUpperCase());
        holder.textViewTarget.setText(holder.mItem.getTarget().toUpperCase());
        holder.contraintProperty.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent details = new Intent(ctx, TrainingDetailsActivity.class);
                details.putExtra("id", holder.mItem.getId());
                ctx.startActivity(details);
            }
        });*/
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        private TextView textViewTitle, textViewSeriesRepetitions, textViewDescription;
        private ImageView imageViewGif;
        public ExerciseResponse mItem;


        public ViewHolder(View view) {
            super(view);
            mView = view;
            textViewTitle=mView.findViewById(R.id.textViewTitleNamePriceGym);
            textViewSeriesRepetitions=mView.findViewById(R.id.textViewSeriesRepetitions);
            imageViewGif=mView.findViewById(R.id.imageViewGif);
            textViewDescription=mView.findViewById(R.id.textViewDescriptionDetailGym);

        }

        @Override
        public String toString() {
            return super.toString();
        }
    }
}
